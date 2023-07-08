import { PrismaClient } from "@prisma/client";
import { IntentionController } from "../../controllers/intentions/intention.controller"; 
import { IntentionRepository } from "../../../repositories/intention/intention.repository"; 
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'

const prisma = new PrismaClient()

const intentionRepository = new IntentionRepository()
const intentionController = new IntentionController(intentionRepository)

const intentionRouter = (server: FastifyInstance, opts: any, done: () => void) => {
    server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            await intentionController.create(req, reply);
            reply.status(201).send('Intention Created');
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    server.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
          await intentionController.update(req, reply);
          reply.status(200).send(`Intention updated`);
          done();
        } catch (error) {
          console.log(error);
          reply.status(500).send({ error: 'Internal Server Error' });
        }
      });

    done();
}

export default intentionRouter;
