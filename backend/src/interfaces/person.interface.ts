import { Person } from "@prisma/client";

export interface PersonDTO {
    name: string,
    street: string,
    number: string,
    complement: string,
    rg: string,
    cityId: number,
    bloodTypeId: number
}

export interface PersonRepository {
    create(data: PersonDTO): Promise<Person>;
    findById(id: number): Promise<Person | null>;
    findByRg(rg: string): Promise<Person | null>;
    deleteById(id: number): Promise<null>;
    findAll(): Promise<Person[] | []>;
    updateById(id: number, data: PersonDTO): Promise<Person | null>;
}