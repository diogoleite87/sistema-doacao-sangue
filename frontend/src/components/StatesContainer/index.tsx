import { useEffect, useState } from "react";

import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import CreateStateDialog from "../CreateStateDialog";
import UpdateStateDialog from "../UpdateStateDialog";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { stateService } from "../../services/stateService";
import { toast } from "react-toastify";
import { State } from "../../schemas/models";

interface IStateContainerProps {
    states: State[],
    getStates: () => void
}

export default function StatesContainer({ states, getStates }: IStateContainerProps) {

    const [openUpdateState, setOpenUpdateState] = useState<boolean>(false)
    const [openCreateState, setOpenCreateState] = useState<boolean>(false)
    const [openDeleteState, setOpenDeleteState] = useState<boolean>(false)
    const [deleteState, setDeleteState] = useState<State>({} as State)
    const [updateState, setUpdateState] = useState<State>({} as State)
    const [filterState, setFilterState] = useState<string>('')
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
        setFilterState(event.target.value);
        setPage(0);
    };

    const handleOpenCreateState = () => {
        setOpenCreateState(true)
    }

    const handleOpenDeleteState = (state: State) => {
        setDeleteState(state)
        setOpenDeleteState(true)

    }

    const handleOpenUpdateState = (state: State) => {
        setUpdateState(state)
        setOpenUpdateState(true)
    }

    const handleDeleteState = () => {

        setLoading(true)

        stateService.deleteStateById(deleteState?.id).then(() => {
            toast.success('Deletado com sucesso!')
            getStates()
            setOpenDeleteState(false)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getStates()
    }, [])

    return (
        <Box>
            <UpdateStateDialog getStates={getStates} open={openUpdateState} setOpen={setOpenUpdateState} state={updateState} />
            <CreateStateDialog getStates={getStates} open={openCreateState} setOpen={setOpenCreateState} />
            <ConfirmDeleteDialog title={`Deseja deletar ${deleteState.name}?`} handleExecute={handleDeleteState} loading={loading} setOpen={setOpenDeleteState} open={openDeleteState} subTitle="Essa operação não poderá ser desfeita." />
            <Box mb={4} mt={4} display='flex' justifyContent='center' >
                <TextField variant="filled" fullWidth label='Pesquisar Estado' onChange={handleFilter} disabled={loading} />
                <Button variant="contained" sx={{ ml: 1 }} disabled={loading} onClick={handleOpenCreateState}>
                    Cadastrar
                </Button>
            </Box>
            <TableContainer component={Paper} >
                <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Estado</strong></TableCell>
                            <TableCell align="center"><strong>Sigla</strong></TableCell>
                            <TableCell align="center" ><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {states
                            .filter(state => state.name.toLowerCase().includes(filterState.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((state) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={state.id}>
                                        <TableCell>{state.name}</TableCell>
                                        <TableCell align="center">
                                            {state.acronym}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button size="small" color="warning" onClick={() => handleOpenUpdateState(state)}>
                                                Editar
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleOpenDeleteState(state)}>
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
                    count={states.filter(state => state.name.toLowerCase().includes(filterState.toLowerCase())).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    )
}