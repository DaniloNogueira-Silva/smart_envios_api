import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import routes from "./interface/routes";
import dotenv from 'dotenv';

const server = Fastify();
server.register(fastifyCors);
routes(server);
dotenv.config();

server
  .listen(4554)
  .then(() => {
    console.log("Server rodando na porta 4554");
  })
  .catch((error) => {
    console.error("Erro ao iniciar o server", error);
    process.exit(1);
  });
