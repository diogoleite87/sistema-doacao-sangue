import { useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { bloodTypeService } from "../../services/bloodTypeService"
import { BloodType } from "../../schemas/models"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface ICreateBloodTypeDialog {
    open: boolean,
    setOpen(state: boolean): void,
    bloodType: BloodType,
    getBloodTypes: () => void
}

export default function UpdateBloodTypeDialog({ open, setOpen, getBloodTypes, bloodType }: ICreateBloodTypeDialog) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const type = String(data.get('type'))
        const factor = String(data.get('factor'))

        setLoading(true)

        bloodTypeService.putBloodTypeById(bloodType.id, { type, factor }).then(() => {
            toast.success(`${type} atualizado com sucesso!`)
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
                        <Grid item>Atualizar {bloodType.type}</Grid>
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
                            <TextField fullWidth name="type" id="type" label="Tipo" required defaultValue={bloodType.type} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth name="factor" id="factor" label="Fator" required defaultValue={bloodType.factor} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />
                <Box sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                        <Button variant="contained" component="label" color="error" onClick={() => setOpen(false)} >Fechar</Button>
                        <LoadingButton loading={loading} variant="contained" color="primary" type='submit' >Atualizar</LoadingButton>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}