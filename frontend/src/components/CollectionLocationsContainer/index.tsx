import { useEffect, useState } from "react";

import CreateCollectionLocationDialog from "../CreateCollectionLocationDialog";
import UpdateCollectionLocationDialog from "../UpdateCollectionLocationDialog";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { collectionLocationService } from "../../services/collectionLocationService";
import { City, CollectionLocation } from "../../schemas/models";
import { cityService } from "../../services/cityService";
import { toast } from "react-toastify";

export default function CollectionsLocationContainer() {

    const [deleteCollectionLocation, setDeleteCollectionLocation] = useState<CollectionLocation>({} as CollectionLocation)
    const [updateCollectionLocation, setUpdateCollectionLocation] = useState<CollectionLocation>({} as CollectionLocation)
    const [openUpdateCollectionLocation, setOpenUpdateCollectionLocation] = useState<boolean>(false)
    const [openCreateCollectionLocation, setOpenCreateCollectionLocation] = useState<boolean>(false)
    const [openDeleteCollectionLocation, setOpenDeleteCollectionLocation] = useState<boolean>(false)
    const [collectionLocations, setCollectionLocations] = useState<CollectionLocation[]>([])
    const [filterCollectionLocation, setFilterCollectionLocation] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [cities, setCities] = useState<City[]>([])
    const [page, setPage] = useState<number>(0)

    const getCities = () => {

        setLoading(true)

        toast.promise(cityService.getAllCities(), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setCities(res.data)
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
        setFilterCollectionLocation(event.target.value);
        setPage(0);
    };

    const handleOpenCreateCollectionLocation = () => {
        setOpenCreateCollectionLocation(true)
    }

    const handleOpenDeleteCollectionLocation = (collectionLocation: CollectionLocation) => {
        setDeleteCollectionLocation(collectionLocation)
        setOpenDeleteCollectionLocation(true)

    }

    const handleOpenUpdateCollectionLocation = (collectionLocation: CollectionLocation) => {
        setUpdateCollectionLocation(collectionLocation)
        setOpenUpdateCollectionLocation(true)
    }

    const handleDeleteCollectionLocation = () => {

        setLoading(true)

        collectionLocationService.deleteCollectionLocationById(deleteCollectionLocation?.id).then(() => {
            toast.success('Deletado com sucesso!')
            getCollectionLocations()
            setOpenDeleteCollectionLocation(false)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getCollectionLocations()
        getCities()
    }, [])

    return (
        <Box>
            <UpdateCollectionLocationDialog cities={cities} collectionLocation={updateCollectionLocation} getCollectionLocations={getCollectionLocations} open={openUpdateCollectionLocation} setOpen={setOpenUpdateCollectionLocation} />
            <ConfirmDeleteDialog title={`Deseja deletar ${deleteCollectionLocation.name}?`} handleExecute={handleDeleteCollectionLocation} loading={loading} setOpen={setOpenDeleteCollectionLocation} open={openDeleteCollectionLocation} subTitle="Essa operação não poderá ser desfeita." />
            <CreateCollectionLocationDialog cities={cities} getCollectionLocations={getCollectionLocations} open={openCreateCollectionLocation} setOpen={setOpenCreateCollectionLocation} />
            <Box mb={4} mt={4} display='flex' justifyContent='center' >
                <TextField variant="filled" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                <Button variant="contained" sx={{ ml: 1 }} disabled={loading} onClick={handleOpenCreateCollectionLocation}>
                    Cadastrar
                </Button>
            </Box>
            <TableContainer component={Paper} >
                <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Nome</strong></TableCell>
                            <TableCell align="center"><strong>Rua</strong></TableCell>
                            <TableCell align="center"><strong>Número</strong></TableCell>
                            <TableCell align="center"><strong>Complemento</strong></TableCell>
                            <TableCell align="center"><strong>Cidade</strong></TableCell>
                            <TableCell align="center" ><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {collectionLocations
                            .filter(collectionLocation => collectionLocation.name.toLowerCase().includes(filterCollectionLocation.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((collectionLocation) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={collectionLocation.id}>
                                        <TableCell>{collectionLocation.name}</TableCell>
                                        <TableCell align="center">{collectionLocation.street}</TableCell>
                                        <TableCell align="center">{collectionLocation.number}</TableCell>
                                        <TableCell align="center">{collectionLocation.complement}</TableCell>
                                        <TableCell align="center">{cities?.find(city => city.id === collectionLocation.cityId)?.name}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" color="warning" onClick={() => handleOpenUpdateCollectionLocation(collectionLocation)}>
                                                Editar
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleOpenDeleteCollectionLocation(collectionLocation)}>
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
                    count={collectionLocations.filter(collectionLocation => collectionLocation.name.toLowerCase().includes(filterCollectionLocation.toLowerCase())).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    )
}