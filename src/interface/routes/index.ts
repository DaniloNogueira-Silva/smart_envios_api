import { FastifyInstance } from "fastify";
import leadRouter from "../routes/lead/lead.routes";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import intentionRouter from "./intention/intention.routes";

const server: FastifyInstance = fastify();
server.register(fastifyCors);

const routes = async (server: FastifyInstance): Promise<void> => {
  await server.register(leadRouter, { prefix: "/lead" } as any);
  await server.register(intentionRouter, { prefix: "/intention" } as any);
};

export default routes;
