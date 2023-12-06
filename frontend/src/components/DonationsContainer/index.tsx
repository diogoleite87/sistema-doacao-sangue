import { useEffect, useState } from "react"

import TableDonations from "../TableDonations"

import { donationService } from "../../services/donationService"
import { Donation } from "../../schemas/models"
import { toast } from "react-toastify"

export default function DonationsContainer() {

    const [donations, setDonations] = useState<Donation[]>([])
    const [_loading, setLoading] = useState<boolean>(false)

    const getDonations = () => {
        setLoading(true)

        toast.promise(donationService.getAllDonations(), {
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

    useEffect(() => {
        getDonations()
    }, [])

    return (
        <TableDonations donations={donations} getDonations={getDonations} />
    )
}