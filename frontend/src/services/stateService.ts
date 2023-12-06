import { api } from "../providers";

import { StateDTO } from "../schemas/dto";
import { State } from "../schemas/models";

const putStateById = (id: number, data: StateDTO) => api.put(`/state/${id}`, data)
const getStateById = (id: number) => api.get<State>(`/state/${id}`)
const deleteStateById = (id: number) => api.delete(`/state/${id}`)
const postState = (data: StateDTO) => api.post(`/state`, data)
const getAllStates = () => api.get<State[]>(`/state`)

export const stateService = {
    deleteStateById,
    getAllStates,
    putStateById,
    getStateById,
    postState
}