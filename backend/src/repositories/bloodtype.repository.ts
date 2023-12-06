import { BloodTypeDTO, BloodTypeRepository } from "../interfaces/bloodtype.interface";
import { prisma } from "../database/prisma-client";
import { BloodType } from "@prisma/client";

class BloodTypeRepositoryPrisma implements BloodTypeRepository {

    async create(data: BloodTypeDTO): Promise<BloodType> {
        const result = await prisma.bloodType.create({
            data
        });

        return result;
    }

    async findById(id: number): Promise<BloodType | null> {

        const result = await prisma.bloodType.findUnique({
            where: {
                id
            }
        });

        return result || null;
    }

    async deleteById(id: number): Promise<null> {

        const result = await prisma.bloodType.delete({
            where: {
                id
            }
        });

        return null;
    }

    async findAll(): Promise<BloodType[] | []> {

        const result = await prisma.bloodType.findMany();

        return result || null;
    }

    async updateById(id: number, data: BloodTypeDTO): Promise<BloodType | null> {

        const result = await prisma.bloodType.update({
            data,
            where: {
                id
            }
        });

        return result || null;
    }

    async findByTypeAndFactor(type: string, factor: string): Promise<BloodType | null> {

        const result = await prisma.bloodType.findFirst({
            where: {
                type,
                factor
            }
        })

        return result || null;
    }

}

export { BloodTypeRepositoryPrisma }