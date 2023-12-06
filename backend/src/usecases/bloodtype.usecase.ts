import { BloodTypeDTO, BloodTypeRepository } from "../interfaces/bloodtype.interface";
import { BloodTypeRepositoryPrisma } from "../repositories/bloodtype.repository";
import { ApiError } from "../middleware/error";
import { BloodType } from "@prisma/client";

class BloodTypeUseCase {
    private bloodTypeRepository: BloodTypeRepository;
    constructor() {
        this.bloodTypeRepository = new BloodTypeRepositoryPrisma;
    }

    async create(body: BloodTypeDTO): Promise<BloodType> {

        const verifyIfBloodTypeExists = await this.bloodTypeRepository.findByTypeAndFactor(body.type, body.type);

        if (verifyIfBloodTypeExists) {
            throw new ApiError(409, 'Blood type already exists.');
        }

        const result = await this.bloodTypeRepository.create(body);

        return result;
    }

    async findById(id: number): Promise<BloodType | null> {

        const result = await this.bloodTypeRepository.findById(id);

        return result;
    }

    async deleteById(id: number): Promise<null> {

        const verifyIfBloodTypeExists = await this.bloodTypeRepository.findById(id);

        if (!verifyIfBloodTypeExists) {
            throw new ApiError(404, 'Blood type doesnot exists.');
        }

        const result = await this.bloodTypeRepository.deleteById(id);

        return result;
    }

    async findAll(): Promise<BloodType[] | []> {

        const result = await this.bloodTypeRepository.findAll();

        return result;
    }

    async updateById(id: number, body: BloodTypeDTO) {

        const verifyIfBloodTypeExists = await this.bloodTypeRepository.findById(id);

        if (!verifyIfBloodTypeExists) {
            throw new ApiError(404, 'Blood type doesnot exists.');
        }

        const result = await this.bloodTypeRepository.updateById(id, body);

        return result;
    }
}

export { BloodTypeUseCase }