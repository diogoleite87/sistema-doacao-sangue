import { useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { stateService } from "../../services/stateService"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface ICreateStateDialog {
    open: boolean,
    setOpen(state: boolean): void,
    getStates: () => void,
}

export default function CreateStateDialog({ open, setOpen, getStates }: ICreateStateDialog) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const acronym = String(data.get('acronym'))

        setLoading(true)

        stateService.postState({ name, acronym }).then(() => {
            toast.success(`${name} cadastrado com sucesso!`)
            setOpen(false)
        }).catch(err => {
            toast.error(`${err.message}}`)
        }).finally(() => {
            getStates()
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
                        <Grid item>Cadastrar Estado</Grid>
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
                            <TextField fullWidth name="name" id="name" label="Nome" required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth name="acronym" id="acronym" label="Sigla" required />
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