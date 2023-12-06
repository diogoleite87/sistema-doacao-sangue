import { prisma } from "../database/prisma-client";
import { CityDTO, CityRepository } from "../interfaces/city.interface";
import { City } from "@prisma/client";

class CityRepositoryPrisma implements CityRepository {

    async create(data: CityDTO): Promise<City> {
        const result = await prisma.city.create({
            data
        });

        return result;
    }

    async findById(id: number): Promise<City | null> {

        const result = await prisma.city.findUnique({
            where: {
                id
            }
        });

        return result || null;
    }

    async deleteById(id: number): Promise<null> {

        const result = await prisma.city.delete({
            where: {
                id
            }
        });

        return null;
    }
    async findAll(): Promise<[] | City[]> {

        const result = await prisma.city.findMany();

        return result || null;
    }

    async updateById(id: number, data: CityDTO): Promise<City | null> {

        const result = await prisma.city.update({
            data,
            where: {
                id
            }
        });

        return result || null;
    }
    async findByNameAndStateId(name: string, stateId: number): Promise<City | null> {

        const result = await prisma.city.findFirst({
            where: {
                name,
                stateId
            }
        })

        return result || null;
    }

}

export { CityRepositoryPrisma }