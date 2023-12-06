import { useEffect, useState } from "react";

import CreateDonationDialog from "../CreateDonationDialog";
import UpdateDonationDialog from "../UpdateDonationDialog";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import ButtonOpenPerson from "../ButtonOpenPerson";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { collectionLocationService } from "../../services/collectionLocationService";
import { CollectionLocation, Donation, Person } from "../../schemas/models";
import { donationService } from "../../services/donationService";
import { personService } from "../../services/personService";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/fomartDate";

interface ITableDonationsProps {
    donations: Donation[],
    getDonations: () => void,
    personId?: number
}

export default function TableDonations({ donations, getDonations, personId }: ITableDonationsProps) {

    const [collectionLocations, setCollectionLocations] = useState<CollectionLocation[]>([])
    const [openRegisterDonation, setOpenRegisterDonation] = useState<boolean>(false)
    const [updateDonation, setUpdateDonation] = useState<Donation>({} as Donation)
    const [deleteDonation, setDeleteDonation] = useState<Donation>({} as Donation)
    const [openUpdateDonation, setOpenUpdateDonation] = useState<boolean>(false)
    const [openDeleteDonation, setOpenDeleteDonation] = useState<boolean>(false)
    const [filterDonation, setFilterDonation] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [persons, setPersons] = useState<Person[]>([])
    const [page, setPage] = useState<number>(0)

    const getPersons = () => {

        setLoading(true)

        toast.promise(personService.getAllPersons(), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setPersons(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getCollectionLocations = () => {

        setLoading(true)

        toast.promise(collectionLocationService.getAllCollectionLocations(), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setCollectionLocations(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }


    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterDonation(event.target.value);
        setPage(0);
    };

    const handleOpenRegisterDonation = () => {
        setOpenRegisterDonation(true)
    }

    const handleOpenDeleteDonation = (donation: Donation) => {
        setOpenDeleteDonation(true)
        setDeleteDonation(donation)
    }

    const handleOpenUpdatePerson = (donation: Donation) => {
        setOpenUpdateDonation(true)
        setUpdateDonation(donation)
    }

    const handleDeleteDonation = () => {

        setLoading(true)

        donationService.deleteDonationById(deleteDonation.id).then(() => {
            toast.success('Deletado com sucesso!')
            getDonations()
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
            setOpenDeleteDonation(false)
        })
    }

    useEffect(() => {
        getPersons()
        getCollectionLocations()
    }, [])

    return (
        <Box>
            <UpdateDonationDialog collectionLocations={collectionLocations} donation={updateDonation} getDonations={getDonations} open={openUpdateDonation} persons={persons} setOpen={setOpenUpdateDonation} />
            <CreateDonationDialog collectionLocations={collectionLocations} getDonations={getDonations} open={openRegisterDonation} setOpen={setOpenRegisterDonation} persons={persons} personId={personId} />
            <ConfirmDeleteDialog open={openDeleteDonation} setOpen={setOpenDeleteDonation} handleExecute={handleDeleteDonation} loading={loading} title={`Deseja deletar?`} subTitle={"Essa operação não poderá ser desfeita."} />
            <Box mb={4} mt={4} display='flex' justifyContent='center' >
                <TextField variant="filled" type="date" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} InputLabelProps={{
                    shrink: true,
                }} />
                <Button variant="contained" sx={{ ml: 1 }} disabled={loading} onClick={handleOpenRegisterDonation}>
                    Cadastrar
                </Button>
            </Box>
            <TableContainer component={Paper} >
                <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Doador</strong></TableCell>
                            <TableCell align="center"><strong>Local de Coleta</strong></TableCell>
                            <TableCell align="center"><strong>Data</strong></TableCell>
                            <TableCell align="center" ><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donations
                            .filter(donation => {
                                const donationDateObject = new Date(donation.date);

                                if (isNaN(donationDateObject.getTime())) {
                                    return false;
                                }

                                const formattedDonationDate = donationDateObject.toISOString().toLowerCase();
                                const filterString = filterDonation.toLowerCase();

                                return formattedDonationDate.includes(filterString);
                            })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((donation) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={donation.id}>
                                        <TableCell align="center">
                                            {persons?.find(person => person.id === donation.personId)?.name}
                                            <ButtonOpenPerson personId={donation.personId} />
                                        </TableCell>
                                        <TableCell align="center">{collectionLocations?.find(collectionLocation => collectionLocation.id === donation.localId)?.name}</TableCell>
                                        <TableCell align="center">{formatDate(donation.date)}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" color="warning" onClick={() => handleOpenUpdatePerson(donation)}>
                                                Editar
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleOpenDeleteDonation(donation)}>
                                                Excluir
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={donations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    )
}