import { DonationDTO, DonationRepository } from "../interfaces/donation.interface";
import { prisma } from "../database/prisma-client";
import { Donation } from "@prisma/client";

class DonationRepositoryPrisma implements DonationRepository {

    async create(data: DonationDTO): Promise<Donation> {
        const result = await prisma.donation.create({
            data
        });

        return result;
    }

    async findById(id: number): Promise<Donation | null> {

        const result = await prisma.donation.findUnique({
            where: {
                id
            }
        });

        return result || null;
    }

    async deleteById(id: number): Promise<null> {

        const result = await prisma.donation.delete({
            where: {
                id
            }
        });

        return null;
    }
    async findAll(): Promise<[] | Donation[]> {

        const result = await prisma.donation.findMany();

        return result || null;
    }

    async updateById(id: number, data: DonationDTO): Promise<Donation | null> {

        const result = await prisma.donation.update({
            data,
            where: {
                id
            }
        })

        return result || null;
    }

    async findAllByPersonId(personId: number): Promise<Donation[] | []> {

        const result = await prisma.donation.findMany({
            where: {
                personId
            }
        })

        return result;
    }

}

export { DonationRepositoryPrisma }