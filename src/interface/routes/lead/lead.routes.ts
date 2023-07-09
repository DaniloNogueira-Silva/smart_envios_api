import { PrismaClient } from "@prisma/client";
import { LeadController } from "../../controllers/lead/lead.controller";
import { LeadRepository } from "../../../repositories/lead/lead.repository";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

const prisma = new PrismaClient();

const leadRepository = new LeadRepository();
const leadController = new LeadController(leadRepository);

interface RequestBody {
  email: string;
}

const leadRouter = (server: FastifyInstance, opts: any, done: () => void) => {
  server.post(
    "/",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await leadController.create(req, reply);
        reply.status(201).send("Lead Created");

      } catch (error) {
        console.log(error);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  );

  done();
};

export default leadRouter;
