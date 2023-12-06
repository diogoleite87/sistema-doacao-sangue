import { useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { bloodTypeService } from "../../services/bloodTypeService"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface ICreateBloodTypeDialog {
    open: boolean,
    setOpen(state: boolean): void,
    getBloodTypes: () => void,
}

export default function CreateBloodTypeDialog({ open, setOpen, getBloodTypes }: ICreateBloodTypeDialog) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const type = String(data.get('type'))
        const factor = String(data.get('factor'))

        setLoading(true)

        bloodTypeService.postBloodType({ type, factor }).then(() => {
            toast.success(`${type} cadastrado com sucesso!`)
            setOpen(false)
        }).catch(err => {
            toast.error(`${err.message}}`)
        }).finally(() => {
            getBloodTypes()
            setLoading(false)
        })
    }

    return (
        <Dialog
            TransitionProps={{ unmountOnExit: true }}
            open={open}
            scroll="body"
            maxWidth='md'
            fullWidth
        >
            <Box
                component='form'
                onSubmit={handleSubmit}
            >
                <DialogTitle>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>Cadastrar Tipo Sanguíneo</Grid>
                        <Grid item>
                            <IconButton sx={{ size: 'small' }} onClick={() => setOpen(false)}>
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider />

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField fullWidth name="type" id="type" label="Tipo" required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth name="factor" id="factor" label="Fator" required />
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={() => setOpen(false)} >Fechar</Button>
                        <LoadingButton loading={loading} variant="contained" color="primary" type='submit' >Cadastrar</LoadingButton>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}