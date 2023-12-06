import { State } from "@prisma/client";
import { StateDTO, StateRepository } from "../interfaces/state.interface";
import { prisma } from "../database/prisma-client";

class StateRepositoryPrisma implements StateRepository {

    async create(data: StateDTO): Promise<State> {
        const result = await prisma.state.create({
            data
        });

        return result;
    }

    async findById(id: number): Promise<State | null> {

        const result = await prisma.state.findUnique({
            where: {
                id
            }
        });

        return result || null;
    }

    async deleteById(id: number): Promise<null> {

        const result = await prisma.state.delete({
            where: {
                id
            }
        });

        return null;
    }

    async findAll(): Promise<State[] | []> {

        const result = await prisma.state.findMany();

        return result || null;
    }

    async updateById(id: number, data: StateDTO): Promise<State | null> {

        const result = await prisma.state.update({
            data,
            where: {
                id
            }
        });

        return result || null;
    }

    async findByAcronym(acronym: string): Promise<State | null> {

        const result = await prisma.state.findFirst({
            where: {
                acronym
            }
        });

        return result || null;
    }

    async findByName(name: string): Promise<State | null> {

        const result = await prisma.state.findFirst({
            where: {
                name
            }
        })

        return result || null;
    }

}

export { StateRepositoryPrisma }