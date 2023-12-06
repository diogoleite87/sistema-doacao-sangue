import { DonationDTO, DonationRepository } from "../interfaces/donation.interface";
import { DonationRepositoryPrisma } from "../repositories/donation.repository";
import { ApiError } from "../middleware/error";
import { Donation } from "@prisma/client";

class DonationUseCase {
    private donationRepository: DonationRepository;
    constructor() {
        this.donationRepository = new DonationRepositoryPrisma();
    }

    async create(body: DonationDTO): Promise<Donation> {

        const result = await this.donationRepository.create(body);

        return result;
    }

    async findById(id: number): Promise<Donation | null> {

        const result = await this.donationRepository.findById(id);

        return result;
    }

    async deleteById(id: number): Promise<null> {

        const verifyIfDonationExists = await this.donationRepository.findById(id);

        if (!verifyIfDonationExists) {
            throw new ApiError(404, 'Donation doesnot exists.');
        }

        const result = await this.donationRepository.deleteById(id);

        return result;
    }

    async findAll(): Promise<Donation[] | []> {

        const result = await this.donationRepository.findAll();

        return result;
    }

    async updateById(id: number, body: DonationDTO) {

        const verifyIfDonationExists = await this.donationRepository.findById(id);

        if (!verifyIfDonationExists) {
            throw new ApiError(404, 'Donation doesnot exists.');
        }

        const result = await this.donationRepository.updateById(id, body);

        return result;
    }

    async finAllByPersonId(personId: number) {

        const result = await this.donationRepository.findAllByPersonId(personId);

        return result;
    }
}

export { DonationUseCase }