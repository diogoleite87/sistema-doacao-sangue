import { FastifyInstance, FastifyRequest } from "fastify";
import { StateUseCase } from "../usecases/state.usecase";
import { StateDTO } from "../interfaces/state.interface";


export async function stateRoutes(fastify: FastifyInstance) {

    const stateUseCase = new StateUseCase();

    fastify.post('/', async (req: FastifyRequest<{ Params: { id: string }, Body: StateDTO }>, reply) => {

        try {
            const data = await stateUseCase.create(req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await stateUseCase.findById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/', async (_req, reply) => {

        try {
            const data = await stateUseCase.findAll();
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.delete('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await stateUseCase.deleteById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.put('/:id', async (req: FastifyRequest<{ Params: { id: string }, Body: StateDTO }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await stateUseCase.updateById(id, req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
}