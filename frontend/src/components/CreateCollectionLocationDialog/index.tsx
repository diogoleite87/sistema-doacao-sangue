import { useState } from "react"

import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { collectionLocationService } from "../../services/collectionLocationService"
import { City } from "../../schemas/models"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface ICreateCollectionLocationDialog {
    open: boolean,
    setOpen(state: boolean): void,
    getCollectionLocations: () => void,
    cities: City[],
}

export default function CreateCollectionLocationDialog({ open, setOpen, cities, getCollectionLocations }: ICreateCollectionLocationDialog) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const street = String(data.get('street'))
        const number = String(data.get('number'))
        const complement = String(data.get('complement'))
        const cityId = cities.find((city) => city.name === String(data.get('cityId')))?.id || 0

        setLoading(true)

        collectionLocationService.postCollectionLocation({ name, street, number, complement, cityId }).then(() => {
            toast.success(`${name} cadastrado com sucesso!`)
            setOpen(false)
        }).catch(err => {
            toast.error(`${err.message}}`)
        }).finally(() => {
            getCollectionLocations()
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
                        <Grid item>Cadastrar Local de Coleta</Grid>
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
                            <TextField fullWidth name="street" id="street" label="Rua / Avenida" required />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="number" id="number" label="Número" required type="number" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="complement" id="complement" label="Complemento" />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                disablePortal
                                id="cityId"
                                options={cities}
                                fullWidth
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} id="cityId" fullWidth name="cityId" required label="Cidade" />}
                            />
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