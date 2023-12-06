import { BloodTypeUseCase } from "../usecases/bloodtype.usecase";
import { BloodTypeDTO } from "../interfaces/bloodtype.interface";
import { FastifyInstance, FastifyRequest } from "fastify";

export async function bloodTypeRoutes(fastify: FastifyInstance) {

    const bloodTypeUseCase = new BloodTypeUseCase();

    fastify.post('/', async (req: FastifyRequest<{ Params: { id: string }, Body: BloodTypeDTO }>, reply) => {

        try {
            const data = await bloodTypeUseCase.create(req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await bloodTypeUseCase.findById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/', async (_req, reply) => {

        try {
            const data = await bloodTypeUseCase.findAll();
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.delete('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await bloodTypeUseCase.deleteById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.put('/:id', async (req: FastifyRequest<{ Params: { id: string }, Body: BloodTypeDTO }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await bloodTypeUseCase.updateById(id, req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
}