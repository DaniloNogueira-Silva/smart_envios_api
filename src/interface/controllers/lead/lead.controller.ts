import { FastifyRequest, FastifyReply } from "fastify";
import { LeadRepository } from "../../../repositories/lead/lead.repository";
import { LeadEntity } from "../../../domain/entities/lead.entity";
import { leadValidation } from "../../../domain/validations/lead.validation";
import nodemailer from "nodemailer";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class LeadController {
  repository: LeadRepository;

  constructor(repository: LeadRepository) {
    this.repository = repository;
  }

  create: RequestHandler = async (req, res) => {
    try {
      // await leadValidation.validate(req.body);
      const leadInterface: LeadEntity = req.body as LeadEntity;
      const lead: LeadEntity = await this.repository.create(leadInterface);

      const user = process.env.USER;
      const pass = process.env.PASS;
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from: user,
        to: leadInterface.email,
        subject: "Lead Criado",
        text: "Agradecemos seu interesse pela nossa plataforma!",
      });

      res.send(lead);
    }catch (error) {
      res.send({ error: "Internal Server Error" });
    }
  };
}
