import { useEffect, useState } from "react"

import ConfirmDeleteDialog from "../ConfirmDeleteDialog"
import UpdatePersonDialog from "../UpdatePersonDialog"
import TableDonations from "../TableDonations"

import { BloodType, City, Donation, Person } from "../../schemas/models"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { bloodTypeService } from "../../services/bloodTypeService"
import { donationService } from "../../services/donationService"
import { personService } from "../../services/personService"
import { cityService } from "../../services/cityService"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


interface IPersonContainerProps {
    personId: number
}

export default function PersonContainer({ personId }: IPersonContainerProps) {

    const navigate = useNavigate()

    const [openUpdatePerson, setOpenUpdatePerson] = useState<boolean>(false)
    const [openDeletePerson, setOpenDeletePerson] = useState<boolean>(false)
    const [bloodTypes, setBloodTypes] = useState<BloodType[]>([])
    const [donations, setDonations] = useState<Donation[]>([])
    const [person, setPerson] = useState<Person>({} as Person)
    const [loading, setLoading] = useState<boolean>(false)
    const [cities, setCities] = useState<City[]>([])

    const getPersonById = () => {

        setLoading(true)

        toast.promise(personService.getPersonById(personId), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setPerson(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const getDonationsByPersonId = () => {

        setLoading(true)

        toast.promise(donationService.getAllDonationsByPersonId(personId), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setDonations(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

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

    const getCities = () => {
        toast.promise(cityService.getAllCities(), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setCities(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleDeletePerson = () => {

        setLoading(true)

        personService.deletePersonById(person.id).then(() => {
            toast.success('Deletado com sucesso!')
            navigate('/')
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
            setOpenDeletePerson(false)
        })
    }

    const handleUpdatePerson = () => {
        setOpenUpdatePerson(true)
    }

    const handleOpenDeletePerson = () => {
        setOpenDeletePerson(true)
    }

    useEffect(() => {
        getDonationsByPersonId()
        getPersonById()
        getBloodTypes()
        getCities()
    }, [])

    return (
        <Box>
            <ConfirmDeleteDialog open={openDeletePerson} setOpen={setOpenDeletePerson} handleExecute={handleDeletePerson} loading={loading} title={`Deseja deletar ${person.name}?`} subTitle={"Essa operação não poderá ser desfeita."} />
            <UpdatePersonDialog person={person} getPersons={getPersonById} open={openUpdatePerson} setOpen={setOpenUpdatePerson} cities={cities} bloodTypes={bloodTypes} />
            <Paper sx={{
                margin: 'auto',
                maxWidth: 600,
                padding: 4
            }}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h5" gutterBottom>
                        {person.name}
                    </Typography>
                    <Box>
                        <Button variant="outlined" onClick={handleUpdatePerson}>
                            Editar
                        </Button>
                        <Button color="error" variant="outlined" onClick={handleOpenDeletePerson} sx={{ ml: 1 }}>
                            Apagar
                        </Button>
                    </Box>
                </Box>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={6}>
                        <Typography>ID: {person.id}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>RG: {person.rg}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Endereço: {person.street}, {person.number}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Complemento: {person.complement}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Cidade: {cities?.find(city => city.id === person.cityId)?.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Tipo Sanguíneo: {bloodTypes?.find(bloodType => bloodType.id === person.bloodTypeId)?.type}</Typography>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <Typography>Created At: {person.createdAt}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Updated At: {person.updatedAt}</Typography>
                    </Grid> */}
                </Grid>
            </Paper>
            <Typography variant="h5" mt={5} mb={2}>
                Doações feita por {person.name}:
            </Typography>
            <TableDonations donations={donations} getDonations={getDonationsByPersonId} personId={personId} />
        </Box>
    )
}