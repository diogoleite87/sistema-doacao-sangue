import { State } from "@prisma/client";

export interface StateDTO {
    name: string,
    acronym: string
}

export interface StateRepository {
    create(data: StateDTO): Promise<State>;
    findById(id: number): Promise<State | null>;
    deleteById(id: number): Promise<null>;
    findAll(): Promise<State[] | []>;
    updateById(id: number, data: StateDTO): Promise<State | null>;
    findByAcronym(acronym: string): Promise<State | null>;
    findByName(name: string): Promise<State | null>;
}