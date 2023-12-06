import { StateDTO, StateRepository } from "../interfaces/state.interface";
import { StateRepositoryPrisma } from "../repositories/state.repository";
import { ApiError } from "../middleware/error";
import { State } from "@prisma/client";

class StateUseCase {
    private stateRepository: StateRepository;
    constructor() {
        this.stateRepository = new StateRepositoryPrisma;
    }

    async create(body: StateDTO): Promise<State> {

        const verifyIfStateExistsByAcronym = await this.stateRepository.findByAcronym(body.acronym);
        const verifyIfStateExistsByName = await this.stateRepository.findByName(body.name);

        if (verifyIfStateExistsByAcronym) {
            throw new ApiError(409, 'State acronym already exists.');
        } else if (verifyIfStateExistsByName) {
            throw new ApiError(409, 'State name already exists.');
        }

        const result = await this.stateRepository.create(body);

        return result;
    }

    async findById(id: number): Promise<State | null> {

        const result = await this.stateRepository.findById(id);

        return result;
    }

    async deleteById(id: number): Promise<null> {

        const verifyIfStateExists = await this.stateRepository.findById(id);

        if (!verifyIfStateExists) {
            throw new ApiError(404, 'State doesnot exists.');
        }

        const result = await this.stateRepository.deleteById(id);

        return result;
    }

    async findAll(): Promise<State[] | []> {

        const result = await this.stateRepository.findAll();

        return result;
    }

    async updateById(id: number, body: StateDTO) {

        const verifyIfStateExists = await this.stateRepository.findById(id);

        if (!verifyIfStateExists) {
            throw new ApiError(404, 'State doesnot exists.');
        }

        const result = await this.stateRepository.updateById(id, body);

        return result;
    }
}

export { StateUseCase }