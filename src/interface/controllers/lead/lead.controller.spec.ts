import { FastifyRequest, FastifyReply } from "fastify";
import { LeadRepository } from "../../../repositories/lead/lead.repository";
import { LeadEntity } from "../../../domain/entities/lead.entity";
import { LeadController } from "./lead.controller";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

describe("Lead Controller", () => {
  let leadController: LeadController;
  let leadRepositoryMock: LeadRepository;
  let createLeadMock: jest.Mock;

  beforeEach(() => {
    createLeadMock = jest.fn(async (lead: LeadEntity) => {
      const createdLead: LeadEntity = {
        id: "1",
        name: lead.name,
        email: lead.email,
      };
      return createdLead;
    });

    leadRepositoryMock = {
      create: createLeadMock,
    } as unknown as LeadRepository;

    leadController = new LeadController(leadRepositoryMock);
  });

  it("create should create a new lead", async () => {
    const req: MyRequest = {
      body: {
        name: "mock",
        email: "mock@gmail.com",
      } as LeadEntity,
    } as MyRequest;

    const sendMock = jest.fn();

    const res: MyReply = {
      send: sendMock,
    } as unknown as MyReply;

    await leadController.create(req, res);

    expect(createLeadMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({
      id: "1",
      name: "mock",
      email: "mock@gmail.com",
    });
  });
});
