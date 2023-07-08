import { FastifyRequest, FastifyReply } from "fastify";
import { LeadRepository } from "../../../repositories/lead/lead.repository";
import { LeadEntity } from "../../../domain/entities/lead.entity";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class LeadController {
  repository: LeadRepository;

  constructor(repository: LeadRepository) {
    this.repository = repository;
  }

  create: RequestHandler = async (req, res) => {
    const leadInterface: LeadEntity = req.body as LeadEntity;
    const lead: LeadEntity = await this.repository.create(leadInterface);
    res.send(lead);
  };
}
