import { useState } from "react"

import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField } from "@mui/material"
import { BloodType, City, Person } from "../../schemas/models"
import { personService } from "../../services/personService"
import { Close } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"

interface IUpdatePersonDialog {
    open: boolean,
    setOpen(state: boolean): void,
    getPersons: () => void,
    bloodTypes: BloodType[],
    cities: City[],
    person: Person
}

export default function UpdatePersonDialog({ open, setOpen, bloodTypes, cities, getPersons, person }: IUpdatePersonDialog) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const name = String(data.get('name'))
        const street = String(data.get('street'))
        const number = String(data.get('number'))
        const complement = String(data.get('complement'))
        const rg = String(data.get('rg'))
        const cityId = cities.find((city) => city.name === String(data.get('cityId')))?.id || 0
        const bloodTypeId = bloodTypes.find((bloodType) => bloodType.type === String(data.get('bloodTypeId')))?.id || 0

        console.log(person.id)
        console.log({ name, street, number, complement, rg, cityId, bloodTypeId })

        setLoading(true)

        personService.putPersonById(person.id, { name, street, number, complement, rg, cityId, bloodTypeId }).then(() => {
            toast.success(`${name} atualizado com sucesso!`)
            setOpen(false)
        }).catch(err => {
            toast.error(`${err.message}}`)
        }).finally(() => {
            getPersons()
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
                        <Grid item>Editar {person.name}</Grid>
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
                            <TextField fullWidth name="name" id="name" label="Nome" required defaultValue={person.name} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth name="street" id="street" label="Rua / Avenida" required defaultValue={person.street} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="number" id="number" label="Número" required type="number" defaultValue={person.number} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="complement" id="complement" label="Complemento" defaultValue={person.complement} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth name="rg" id="rg" label="RG" required defaultValue={person.rg} />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="cityId"
                                options={cities}
                                defaultValue={cities.find((city) => city.id === person.cityId)}
                                fullWidth
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params} id="cityId" fullWidth name="cityId" required label="Cidade" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="cityId"
                                options={bloodTypes}
                                defaultValue={bloodTypes.find((bloodType) => bloodType.id === person.bloodTypeId)}
                                fullWidth
                                getOptionLabel={(option) => option.type}
                                renderInput={(params) => <TextField {...params} id="bloodTypeId" fullWidth name="bloodTypeId" required label="Tipo Sanguíneo" />}
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