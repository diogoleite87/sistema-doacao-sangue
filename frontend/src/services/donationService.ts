import { api } from "../providers";

import { DonationDTO } from "../schemas/dto";
import { Donation } from "../schemas/models";

const putDonationById = (id: number, data: DonationDTO) => api.put(`/donation/${id}`, data)
const getDonationById = (id: number) => api.get<Donation>(`/donation/${id}`)
const deleteDonationById = (id: number) => api.delete(`/donation/${id}`)
const postDonation = (data: DonationDTO) => api.post(`/donation`, data)
const getAllDonations = () => api.get<Donation[]>(`/donation`)
const getAllDonationsByPersonId = (personId: number) => api.get<Donation[]>(`/donation/person/${personId}`)

export const donationService = {
    getAllDonationsByPersonId,
    deleteDonationById,
    getAllDonations,
    putDonationById,
    getDonationById,
    postDonation
}