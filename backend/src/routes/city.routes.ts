import { FastifyInstance, FastifyRequest } from "fastify";
import { CityUseCase } from "../usecases/city.usecase";
import { CityDTO } from "../interfaces/city.interface";


export async function cityRoutes(fastify: FastifyInstance) {

    const cityUseCase = new CityUseCase();

    fastify.post('/', async (req: FastifyRequest<{ Params: { id: string }, Body: CityDTO }>, reply) => {

        try {
            const data = await cityUseCase.create(req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await cityUseCase.findById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/', async (_req, reply) => {

        try {
            const data = await cityUseCase.findAll();
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.delete('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await cityUseCase.deleteById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.put('/:id', async (req: FastifyRequest<{ Params: { id: string }, Body: CityDTO }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await cityUseCase.updateById(id, req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
}