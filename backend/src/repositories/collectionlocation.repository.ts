import { CollectionLocationDTO, CollectionLocationRepository } from "../interfaces/collectionlocation.interface";
import { CollectionLocation } from "@prisma/client";
import { prisma } from "../database/prisma-client";


class CollectionLocationRepositoryPrisma implements CollectionLocationRepository {

    async create(data: CollectionLocationDTO): Promise<CollectionLocation> {
        const result = await prisma.collectionLocation.create({
            data
        });

        return result;
    }

    async findById(id: number): Promise<CollectionLocation | null> {

        const result = await prisma.collectionLocation.findUnique({
            where: {
                id
            }
        });

        return result || null;
    }

    async deleteById(id: number): Promise<null> {

        const result = await prisma.collectionLocation.delete({
            where: {
                id
            }
        });

        return null;
    }
    async findAll(): Promise<[] | CollectionLocation[]> {

        const result = await prisma.collectionLocation.findMany();

        return result || null;
    }

    async updateById(id: number, data: CollectionLocationDTO): Promise<CollectionLocation | null> {

        const result = await prisma.collectionLocation.update({
            data,
            where: {
                id
            }
        });

        return result || null;
    }

}

export { CollectionLocationRepositoryPrisma }