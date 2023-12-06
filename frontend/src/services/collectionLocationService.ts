import { api } from "../providers";

import { CollectionLocationDTO } from "../schemas/dto";
import { CollectionLocation } from "../schemas/models";

const putCollectionLocationById = (id: number, data: CollectionLocationDTO) => api.put(`/collection-location/${id}`, data)
const getCollectionLocationById = (id: number) => api.get<CollectionLocation>(`/collection-location/${id}`)
const postCollectionLocation = (data: CollectionLocationDTO) => api.post(`/collection-location`, data)
const deleteCollectionLocationById = (id: number) => api.delete(`/collection-location/${id}`)
const getAllCollectionLocations = () => api.get<CollectionLocation[]>(`/collection-location`)

export const collectionLocationService = {
    deleteCollectionLocationById,
    getAllCollectionLocations,
    putCollectionLocationById,
    getCollectionLocationById,
    postCollectionLocation
}