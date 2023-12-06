import { useState } from "react"

import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { collectionLocationService } from "../../services/collectionLocationService"
import { City, CollectionLocation } from "../../schemas/models"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface IUpdateCollectionLocationDialog {
    open: boolean,
    setOpen(state: boolean): void,
    getCollectionLocations: () => void,
    collectionLocation: CollectionLocation
    cities: City[],
}

export default function UpdateCollectionLocationDialog({ open, setOpen, cities, getCollectionLocations, collectionLocation }: IUpdateCollectionLocationDialog) {

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

        collectionLocationService.putCollectionLocationById(collectionLocation.id, { name, street, number, complement, cityId }).then(() => {
            toast.success(`${name} atualizado com sucesso!`)
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
                        <Grid item>Editat {collectionLocation.name}</Grid>
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
                            <TextField fullWidth name="name" id="name" label="Nome" required defaultValue={collectionLocation.name} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth name="street" id="street" label="Rua / Avenida" required defaultValue={collectionLocation.street} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="number" id="number" label="Número" required type="number" defaultValue={collectionLocation.number} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="complement" id="complement" label="Complemento" defaultValue={collectionLocation.complement} />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                disablePortal
                                id="cityId"
                                options={cities}
                                defaultValue={cities.find((city) => city.id === collectionLocation.cityId)}
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
                        <LoadingButton loading={loading} variant="contained" color="primary" type='submit' >Atualizar</LoadingButton>
                    </Stack>
                </Box>
            </Box>
        </Dialog >
    )
}