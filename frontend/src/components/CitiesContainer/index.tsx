import { useEffect, useState } from "react";

import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { cityService } from "../../services/cityService";
import { City, State } from "../../schemas/models";
import { toast } from "react-toastify";
import CreateCityDialog from "../CreateCityDialog";
import UpdateCityDialog from "../UpdateCityDialog";

interface ICityContainerProps {
    cities: City[],
    states: State[],
    getCities: () => void
}

export default function CitiesContainer({ cities, getCities, states }: ICityContainerProps) {

    const [deleteCity, setDeleteCity] = useState<City>({} as City)
    const [updateCity, setUpdateCity] = useState<City>({} as City)
    const [openUpdateCity, setOpenUpdateCity] = useState<boolean>(false)
    const [openCreateCity, setOpenCreateCity] = useState<boolean>(false)
    const [openDeleteCity, setOpenDeleteCity] = useState<boolean>(false)
    const [filterCity, setFilterCity] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterCity(event.target.value);
        setPage(0);
    };

    const handleOpenCreateCity = () => {
        setOpenCreateCity(true)
    }

    const handleOpenDeleteCity = (city: City) => {
        setDeleteCity(city)
        setOpenDeleteCity(true)

    }

    const handleOpenUpdateCity = (city: City) => {
        setUpdateCity(city)
        setOpenUpdateCity(true)
    }

    const handleDeleteCity = () => {

        setLoading(true)

        cityService.deleteCityById(deleteCity?.id).then(() => {
            toast.success('Deletado com sucesso!')
            getCities()
            setOpenDeleteCity(false)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getCities()
    }, [])

    return (
        <Box>
            <UpdateCityDialog city={updateCity} getCities={getCities} open={openUpdateCity} setOpen={setOpenUpdateCity} states={states} />
            <CreateCityDialog getCities={getCities} open={openCreateCity} setOpen={setOpenCreateCity} states={states} />
            <ConfirmDeleteDialog title={`Deseja deletar ${deleteCity.name}?`} handleExecute={handleDeleteCity} loading={loading} setOpen={setOpenDeleteCity} open={openDeleteCity} subTitle="Essa operação não poderá ser desfeita." />
            <Box mb={4} mt={4} display='flex' justifyContent='center' >
                <TextField variant="filled" fullWidth label='Pesquisar Cidade' onChange={handleFilter} disabled={loading} />
                <Button variant="contained" sx={{ ml: 1 }} disabled={loading} onClick={handleOpenCreateCity}>
                    Cadastrar
                </Button>
            </Box>
            <TableContainer component={Paper} >
                <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Cidade</strong></TableCell>
                            <TableCell align="center"><strong>Estado</strong></TableCell>
                            <TableCell align="center" ><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cities
                            .filter(city => city.name.toLowerCase().includes(filterCity.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((city) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={city.id}>
                                        <TableCell>{city.name}</TableCell>
                                        <TableCell align="center">
                                            {states.find((state) => state.id === city.stateId)?.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button size="small" color="warning" onClick={() => handleOpenUpdateCity(city)}>
                                                Editar
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleOpenDeleteCity(city)}>
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
                    count={cities.filter(city => city.name.toLowerCase().includes(filterCity.toLowerCase())).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    )
}