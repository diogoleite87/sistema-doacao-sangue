import { DonationUseCase } from "../usecases/donation.usecase";
import { DonationDTO } from "../interfaces/donation.interface";
import { FastifyInstance, FastifyRequest } from "fastify";


export async function donationRoutes(fastify: FastifyInstance) {

    const donationUseCase = new DonationUseCase();

    fastify.post('/', async (req: FastifyRequest<{ Params: { id: string }, Body: DonationDTO }>, reply) => {

        try {
            const data = await donationUseCase.create(req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err)
        }
    });

    fastify.get('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await donationUseCase.findById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.get('/', async (_req, reply) => {

        try {
            const data = await donationUseCase.findAll();
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.delete('/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await donationUseCase.deleteById(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.put('/:id', async (req: FastifyRequest<{ Params: { id: string }, Body: DonationDTO }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await donationUseCase.updateById(id, req.body);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });


    fastify.get('/person/:id', async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {

        try {
            const id: number = Number(req.params.id);
            const data = await donationUseCase.finAllByPersonId(id);
            return reply.send(data);
        } catch (err) {
            reply.send(err);
        }
    });
}