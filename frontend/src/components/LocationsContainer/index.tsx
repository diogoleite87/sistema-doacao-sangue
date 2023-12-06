import { useState } from "react"

import { City, State } from "../../schemas/models"
import { cityService } from "../../services/cityService"
import { stateService } from "../../services/stateService"
import { toast } from "react-toastify"
import { Box } from "@mui/material"
import CitiesContainer from "../CitiesContainer"
import StatesContainer from "../StatesContainer"

export default function LocationsContainer() {

    const [_loading, setLoading] = useState<boolean>(false)
    const [states, setStates] = useState<State[]>([])
    const [cities, setCities] = useState<City[]>([])

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

    const getStates = () => {
        toast.promise(stateService.getAllStates(), {
            pending: 'Carregando...',
            error: 'Erro ao retornar os dados.'
        }).then(res => {
            setStates(res.data)
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Box>
            <CitiesContainer cities={cities} getCities={getCities} states={states} />
            <StatesContainer states={states} getStates={getStates} />
        </Box>
    )
}