import { FastifyRequest, FastifyReply } from "fastify";
import { IntentionEntity } from "../../../domain/entities/intention.entity";
import { IntentionRepository } from "../../../repositories/intention/intention.repository";
import { IntentionController } from "./intention.controller";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

const createIntentionMock = jest.fn(async (intention: IntentionEntity) => {
  const createdIntention: IntentionEntity = {
    id: "3",
    zipcode_start: "1234",
    zipcode_end: "5678",
    lead_id: "teste1",
  };
  return createdIntention;
});

const updateIntentionMock = jest.fn(
  async (id: string, intention: IntentionEntity) => {
    // Simular a atualização de uma intenção
    const updatedIntention: IntentionEntity = {
      id: id,
      zipcode_start: "1234",
      zipcode_end: "5678",
      lead_id: "teste2",
    };
    return updatedIntention;
  }
);

describe("Intention Controller", () => {
  let intentionController: IntentionController;

  beforeEach(() => {
    const intentionRepositoryMock = {
      create: createIntentionMock,
      update: updateIntentionMock,
    } as unknown as IntentionRepository;

    intentionController = new IntentionController(intentionRepositoryMock);
  });

  it("create should create a new intention", async () => {
    const req: MyRequest = {
      body: {} as IntentionEntity,
    } as MyRequest;

    const sendMock = jest.fn();

    const res: MyReply = {
      send: sendMock,
    } as unknown as MyReply;

    await intentionController.create(req, res);

    expect(createIntentionMock).toHaveBeenCalledTimes(1);

    expect(sendMock).toHaveBeenCalledWith({
      id: "3",
      zipcode_start: "1234",
      zipcode_end: "5678",
      lead_id: "teste1",
    });
  });

  it("update should update an existing intention", async () => {
    const req: MyRequest = {
      body: {} as IntentionEntity,
      params: { id: "3" },
    } as MyRequest;

    const sendMock = jest.fn();
    const statusMock = jest.fn();

    const res: MyReply = {
      send: sendMock,
      status: statusMock,
    } as unknown as MyReply;

    await intentionController.update(req, res);

    expect(updateIntentionMock).toHaveBeenCalledTimes(1);

    expect(sendMock).toHaveBeenCalledWith({
      id: "3",
      zipcode_start: "1234",
      zipcode_end: "5678",
      lead_id: "teste2",
    });
  });
});
