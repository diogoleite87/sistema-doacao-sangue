import { PersonUseCase } from "../usecases/person.usecase";
import { PersonDTO } from "../interfaces/person.interface";
import { FastifyInstance, FastifyRequest } from "fastify";

export async function personRoutes(fastify: FastifyInstance) {

    const personUseCase = new PersonUseCase()

    fastify.post<{ Body: PersonDTO }>('/', async (req, reply) => {

        try {
            const data = await personUseCase.create(req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await personUseCase.findById(id);
            reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/', async (_req, reply) => {

        try {
            const data = await personUseCase.findAll();
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.delete('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await personUseCase.deleteById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.put('/:id', async (req: FastifyRequest<{ Params: { id: string }, Body: PersonDTO }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await personUseCase.updateById(id, req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
}