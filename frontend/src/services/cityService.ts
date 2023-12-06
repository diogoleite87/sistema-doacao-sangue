import { api } from "../providers";

import { CityDTO } from "../schemas/dto";
import { City } from "../schemas/models";

const putCityById = (id: number, data: CityDTO) => api.put(`/city/${id}`, data)
const getCityById = (id: number) => api.get<City>(`/city/${id}`)
const deleteCityById = (id: number) => api.delete(`/city/${id}`)
const postCity = (data: CityDTO) => api.post(`/city`, data)
const getAllCities = () => api.get<City[]>(`/city`)

export const cityService = {
    deleteCityById,
    getAllCities,
    putCityById,
    getCityById,
    postCity
}