import { api } from "../providers";

import { PersonDTO } from "../schemas/dto";
import { Person } from "../schemas/models";

const putPersonById = (id: number, data: PersonDTO) => api.put(`/person/${id}`, data)
const getPersonById = (id: number) => api.get<Person>(`/person/${id}`)
const deletePersonById = (id: number) => api.delete(`/person/${id}`)
const postPerson = (data: PersonDTO) => api.post(`/person`, data)
const getAllPersons = () => api.get<Person[]>(`/person`)

export const personService = {
    deletePersonById,
    getAllPersons,
    putPersonById,
    getPersonById,
    postPerson
}