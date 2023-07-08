import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./interface/routes";

const server = Fastify();
server.register(cors);
routes(server)

server
  .listen({
    port: 4554,
  })
  .then(() => {
    console.log("Server rodando");
  });
