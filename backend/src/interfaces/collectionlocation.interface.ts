import { CollectionLocation } from "@prisma/client";

export interface CollectionLocationDTO {
    name: string,
    street: string,
    number: string,
    complement: string,
    cityId: number
}

export interface CollectionLocationRepository {
    create(data: CollectionLocationDTO): Promise<CollectionLocation>;
    findById(id: number): Promise<CollectionLocation | null>;
    deleteById(id: number): Promise<null>;
    findAll(): Promise<CollectionLocation[] | []>;
    updateById(id: number, data: CollectionLocationDTO): Promise<CollectionLocation | null>;
}