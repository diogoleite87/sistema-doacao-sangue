import { api } from "../providers";

import { BloodTypeDTO } from "../schemas/dto";
import { BloodType } from "../schemas/models";

const putBloodTypeById = (id: number, data: BloodTypeDTO) => api.put(`/blood-type/${id}`, data)
const getBloodTypeById = (id: number) => api.get<BloodType>(`/blood-type/${id}`)
const deleteBloodTypeById = (id: number) => api.delete(`/blood-type/${id}`)
const postBloodType = (data: BloodTypeDTO) => api.post(`/blood-type`, data)
const getAllBloodTypes = () => api.get<BloodType[]>(`/blood-type`)

export const bloodTypeService = {
    deleteBloodTypeById,
    getAllBloodTypes,
    putBloodTypeById,
    getBloodTypeById,
    postBloodType
}