import { City } from "@prisma/client";

export interface CityDTO {
    name: string,
    stateId: number
}

export interface CityRepository {
    create(data: CityDTO): Promise<City>;
    findById(id: number): Promise<City | null>;
    deleteById(id: number): Promise<null>;
    findAll(): Promise<City[] | []>;
    updateById(id: number, data: CityDTO): Promise<City | null>;
    findByNameAndStateId(name: string, stateId: number): Promise<City | null>;
}