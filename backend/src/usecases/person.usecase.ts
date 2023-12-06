import { PersonDTO, PersonRepository } from "../interfaces/person.interface";
import { PersonRepositoryPrisma } from "../repositories/person.repository";
import { CityRepositoryPrisma } from "../repositories/city.repository";
import { CityRepository } from "../interfaces/city.interface";
import { ApiError } from "../middleware/error";
import { Person } from "@prisma/client";

class PersonUseCase {
    private personRepository: PersonRepository;
    private cityRepository: CityRepository;
    constructor() {
        this.personRepository = new PersonRepositoryPrisma();
        this.cityRepository = new CityRepositoryPrisma();
    }

    async create(body: PersonDTO): Promise<Person> {

        const verifyIfPersonExists = await this.personRepository.findByRg(body.rg);

        if (verifyIfPersonExists) {
            throw new ApiError(409, 'Person rg already exists.');
        }
        const result = await this.personRepository.create(body);

        return result;
    }

    async findById(id: number): Promise<Person | null> {

        const result = await this.personRepository.findById(id);

        return result;
    }

    async deleteById(id: number): Promise<null> {

        const verifyIfCityExists = await this.personRepository.findById(id);

        if (!verifyIfCityExists) {
            throw new ApiError(404, 'Person doesnot exists.');
        }

        const result = await this.personRepository.deleteById(id);

        return result;
    }

    async findAll(): Promise<Person[] | []> {

        const result = await this.personRepository.findAll();

        return result;
    }

    async updateById(id: number, body: PersonDTO) {

        const verifyIfPersonExists = await this.personRepository.findById(id);
        const verifyIfStateExists = await this.cityRepository.findById(body.cityId);

        if (!verifyIfPersonExists) {
            throw new ApiError(404, 'Person doesnot exists.');
        } else if (!verifyIfStateExists) {
            throw new ApiError(409, 'City id for relation doesnot exists.');
        }

        const result = await this.personRepository.updateById(id, body);

        return result;
    }
}

export { PersonUseCase }