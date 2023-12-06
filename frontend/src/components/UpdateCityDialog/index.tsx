import { useState } from "react"

import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { cityService } from "../../services/cityService"
import { City, State } from "../../schemas/models"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface IUpdateCityDialog {
    open: boolean,
    setOpen(state: boolean): void,
    getCities: () => void,
    city: City,
    states: State[],
}

export default function UpdateCityDialog({ open, setOpen, states, getCities, city }: IUpdateCityDialog) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const stateId = states.find((state) => state.name === String(data.get('stateId')))?.id || 0

        setLoading(true)

        cityService.putCityById(city.id, { name, stateId }).then(() => {
            toast.success(`${name} atualizado com sucesso!`)
            setOpen(false)
        }).catch(err => {
            toast.error(`${err.message}}`)
        }).finally(() => {
            getCities()
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
                        <Grid item>Atualizar {city.name}</Grid>
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
                            <TextField fullWidth name="name" id="name" label="Nome" required defaultValue={city.name} />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="stateId"
                                options={states}
                                defaultValue={states.find((state) => state.id === city.stateId)}
                                fullWidth
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} id="stateId" fullWidth name="stateId" required label="Estado" />}
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