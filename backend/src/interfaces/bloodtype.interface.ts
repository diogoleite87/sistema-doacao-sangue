import { BloodType } from "@prisma/client";

export interface BloodTypeDTO {
    type: string,
    factor: string
}

export interface BloodTypeRepository {
    create(data: BloodTypeDTO): Promise<BloodType>;
    findById(id: number): Promise<BloodType | null>;
    deleteById(id: number): Promise<null>;
    findAll(): Promise<BloodType[] | []>;
    updateById(id: number, data: BloodTypeDTO): Promise<BloodType | null>;
    findByTypeAndFactor(type: string, factor: string): Promise<BloodType | null>;
}