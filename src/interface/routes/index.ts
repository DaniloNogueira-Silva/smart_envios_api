import { FastifyInstance } from 'fastify';
import leadRouter from '../routes/lead/lead.routes';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const server: FastifyInstance = fastify();
server.register(fastifyCors);

const routes = async (server: FastifyInstance): Promise<void> => {
  await server.register(leadRouter, { prefix: '/lead' } as any);
};

export default routes;
