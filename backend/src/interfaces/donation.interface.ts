import { Donation } from "@prisma/client";

export interface DonationDTO {
    personId: number,
    localId: number,
    date: Date
}

export interface DonationRepository {
    create(data: DonationDTO): Promise<Donation>;
    findById(id: number): Promise<Donation | null>;
    deleteById(id: number): Promise<null>;
    findAll(): Promise<Donation[] | []>;
    updateById(id: number, data: DonationDTO): Promise<Donation | null>;
    findAllByPersonId(personId: number): Promise<Donation[] | []>;
}