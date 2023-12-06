import { PersonDTO, PersonRepository } from "../interfaces/person.interface";
import { prisma } from "../database/prisma-client";
import { Person } from "@prisma/client";

class PersonRepositoryPrisma implements PersonRepository {

    async create(data: PersonDTO): Promise<Person> {
        const result = await prisma.person.create({
            data
        });

        return result;
    }

    async findById(id: number): Promise<Person | null> {

        const result = await prisma.person.findUnique({
            where: {
                id
            }
        });

        return result || null;
    }

    async findByRg(rg: string): Promise<Person | null> {

        const result = await prisma.person.findFirst({
            where: {
                rg
            }
        });

        return result || null;
    }

    async deleteById(id: number): Promise<null> {

        const result = await prisma.person.delete({
            where: {
                id
            }
        })

        return null;
    }

    async findAll(): Promise<[] | Person[]> {

        const result = await prisma.person.findMany();

        return result;
    }

    async updateById(id: number, data: PersonDTO): Promise<Person | null> {

        const result = await prisma.person.update({
            data,
            where: {
                id
            }
        })

        return result || null;
    }
}

export { PersonRepositoryPrisma }