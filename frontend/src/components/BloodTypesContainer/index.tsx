import { useEffect, useState } from "react";

import CreateBloodTypeDialog from "../CreateBloodTypeDialog";
import UpdateBloodTypeDialog from "../UpdateBloodTypeDialog";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { bloodTypeService } from "../../services/bloodTypeService";
import { BloodType } from "../../schemas/models";
import { toast } from "react-toastify";

export default function BloodTypesContainer() {

    const [deleteBloodType, setDeleteBloodType] = useState<BloodType>({} as BloodType)
    const [updateBloodType, setUpdateBloodType] = useState<BloodType>({} as BloodType)
    const [openUpdateBloodType, setOpenUpdateBloodType] = useState<boolean>(false)
    const [openCreateBloodType, setOpenCreateBloodType] = useState<boolean>(false)
    const [openDeleteBloodType, setOpenBloodType] = useState<boolean>(false)
    const [bloodTypes, setBloodTypes] = useState<BloodType[]>([])
    const [filterBloodType, setFilterBloodType] = useState<string>('')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)

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

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterBloodType(event.target.value);
        setPage(0);
    };

    const handleOpenCreateBloodType = () => {
        setOpenCreateBloodType(true)
    }

    const handleOpenDeleteBloodType = (bloodType: BloodType) => {
        setDeleteBloodType(bloodType)
        setOpenBloodType(true)

    }

    const handleOpenUpdateBloodType = (bloodType: BloodType) => {
        setUpdateBloodType(bloodType)
        setOpenUpdateBloodType(true)
    }

    const handleDeleteBloodType = () => {

        setLoading(true)

        bloodTypeService.deleteBloodTypeById(deleteBloodType?.id).then(() => {
            toast.success('Deletado com sucesso!')
            getBloodTypes()
            setOpenBloodType(false)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getBloodTypes()
    }, [])

    return (
        <Box>
            <UpdateBloodTypeDialog bloodType={updateBloodType} getBloodTypes={getBloodTypes} open={openUpdateBloodType} setOpen={setOpenUpdateBloodType} />
            <CreateBloodTypeDialog getBloodTypes={getBloodTypes} open={openCreateBloodType} setOpen={setOpenCreateBloodType} />
            <ConfirmDeleteDialog title={`Deseja deletar ${deleteBloodType.type}?`} handleExecute={handleDeleteBloodType} loading={loading} setOpen={setOpenBloodType} open={openDeleteBloodType} subTitle="Essa operação não poderá ser desfeita." />
            <Box mb={4} mt={4} display='flex' justifyContent='center' >
                <TextField variant="filled" fullWidth label='Pesquisar' onChange={handleFilter} disabled={loading} />
                <Button variant="contained" sx={{ ml: 1 }} disabled={loading} onClick={handleOpenCreateBloodType}>
                    Cadastrar
                </Button>
            </Box>
            <TableContainer component={Paper} >
                <Table sx={{ width: 1200 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><strong>Tipo</strong></TableCell>
                            <TableCell align="center"><strong>Fator</strong></TableCell>
                            <TableCell align="center" ><strong>Ações</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bloodTypes
                            .filter(bloodType => bloodType.type.toLowerCase().includes(filterBloodType.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((bloodType) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={bloodType.id}>
                                        <TableCell>{bloodType.type}</TableCell>
                                        <TableCell align="center">{bloodType.factor}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" color="warning" onClick={() => handleOpenUpdateBloodType(bloodType)}>
                                                Editar
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleOpenDeleteBloodType(bloodType)}>
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
                    count={bloodTypes.filter(bloodType => bloodType.type.toLowerCase().includes(filterBloodType.toLowerCase())).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    )
}