import { useEffect, useState } from "react";

import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import CreatePersonDialog from "../CreatePersonDialog";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { bloodTypeService } from "../../services/bloodTypeService";
import { BloodType, City, Person } from "../../schemas/models";
import { personService } from "../../services/personService";
import { cityService } from "../../services/cityService";
import { toast } from "react-toastify";
import UpdatePersonDialog from "../UpdatePersonDialog";
import ButtonOpenPerson from "../ButtonOpenPerson";

export default function PersonsContainer() {

    const [openRegisterPerson, setOpenRegisterPerson] = useState<boolean>(false)
    const [openUpdatePerson, setOpenUpdatePerson] = useState<boolean>(false)
    const [openDeletePerson, setOpenDeletePerson] = useState<boolean>(false)
    const [deletePerson, setDeletePerson] = useState<Person>({} as Person)
    const [updatePerson, setUpdatePerson] = useState<Person>({} as Person)
    const [bloodTypes, setBloodTypes] = useState<BloodType[]>([])
    const [filterPerson, setFilterPerson] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [persons, setPersons] = useState<Person[]>([])
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

    const getBloodTypes = () => {

        setLoading(true)

        toast.promise(bloodTypeService.getAllBloodTypes(), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setBloodTypes(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })

    }

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

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPerson(event.target.value);
        setPage(0);
    };

    const handleOpenRegisterPerson = () => {
        setOpenRegisterPerson(true)
    }

    const handleOpenDeletePerson = (person: Person) => {
        setOpenDeletePerson(true)
        setDeletePerson(person)
    }

    const handleOpenUpdatePerson = (person: Person) => {
        setOpenUpdatePerson(true)
        setUpdatePerson(person)
    }

    const handleDeletePerson = () => {

        setLoading(true)

        personService.deletePersonById(deletePerson.id).then(() => {
            toast.success('Deletado com sucesso!')
            getPersons()
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
            setOpenDeletePerson(false)
        })
    }

    useEffect(() => {
        getPersons()
        getCities()
        getBloodTypes()
    }, [])

    return (
        <Box>
            <UpdatePersonDialog open={openUpdatePerson} setOpen={setOpenUpdatePerson} getPersons={getPersons} bloodTypes={bloodTypes} cities={cities} person={updatePerson} />
            <ConfirmDeleteDialog open={openDeletePerson} setOpen={setOpenDeletePerson} handleExecute={handleDeletePerson} loading={loading} title={`Deseja deletar ${deletePerson.name}?`} subTitle={"Essa operação não poderá ser desfeita."} />
            <CreatePersonDialog getPersons={getPersons} bloodTypes={bloodTypes} cities={cities} open={openRegisterPerson} setOpen={setOpenRegisterPerson} />
            <Box mb={4} mt={4} display='flex' justifyContent='center' >
                <TextField variant="filled" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                <Button variant="contained" sx={{ ml: 1 }} disabled={loading} onClick={handleOpenRegisterPerson}>
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
                            <TableCell align="center"><strong>RG</strong></TableCell>
                            <TableCell align="center"><strong>Cidade</strong></TableCell>
                            <TableCell align="center"><strong>Tipo Sanguíneo</strong></TableCell>
                            <TableCell align="center" ><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons
                            .filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((person) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={person.id}>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell align="center">{person.street}</TableCell>
                                        <TableCell align="center">{person.number}</TableCell>
                                        <TableCell align="center">{person.complement}</TableCell>
                                        <TableCell align="center">{person.rg}</TableCell>
                                        <TableCell align="center">{cities?.find(city => city.id === person.cityId)?.name}</TableCell>
                                        <TableCell align="center">{bloodTypes?.find(bloodType => bloodType.id === person.bloodTypeId)?.type}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" color="warning" onClick={() => handleOpenUpdatePerson(person)}>
                                                Editar
                                            </Button>
                                            <Button size="small" color="success">
                                                Doar
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleOpenDeletePerson(person)}>
                                                Excluir
                                            </Button>
                                            <ButtonOpenPerson personId={person.id} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase())).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    )
}