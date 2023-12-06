import { CollectionLocationUseCase } from "../usecases/collectionlocation.usecase";
import { CollectionLocationDTO } from "../interfaces/collectionlocation.interface";
import { FastifyInstance, FastifyRequest } from "fastify";


export async function collectionLocationRoutes(fastify: FastifyInstance) {

    const collectionLocationUseCase = new CollectionLocationUseCase();

    fastify.post('/', async (req: FastifyRequest<{ Params: { id: string }, Body: CollectionLocationDTO }>, reply) => {

        try {
            const data = await collectionLocationUseCase.create(req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await collectionLocationUseCase.findById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/', async (_req, reply) => {

        try {
            const data = await collectionLocationUseCase.findAll();
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.delete('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await collectionLocationUseCase.deleteById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.put('/:id', async (req: FastifyRequest<{ Params: { id: string }, Body: CollectionLocationDTO }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await collectionLocationUseCase.updateById(id, req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
}