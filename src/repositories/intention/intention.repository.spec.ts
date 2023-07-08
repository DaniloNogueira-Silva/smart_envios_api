import { PrismaClient } from "@prisma/client";
import { IntentionRepository } from "./intention.repository";
import { IntentionEntity } from "../../entities/intention.entity";

const prisma = new PrismaClient();

describe('Intention Repository Unit Test', () => {
  let intentionRepository: IntentionRepository;

  beforeAll(() => {
    intentionRepository = new IntentionRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('create should create a new intention', async () => {
    const newIntention: IntentionEntity = {
      id: "12313132sdsad",
      zipcode_start: "12313124141241",
      zipcode_end: '524745664',
      lead_id: "teste1"
    };

    const createdIntention: IntentionEntity = await intentionRepository.create(newIntention);

    expect(createdIntention.id).toBe("12313132sdsad");
    expect(createdIntention.zipcode_start).toBe('12313124141241');
    expect(createdIntention.zipcode_end).toBe("524745664");
    expect(createdIntention.lead_id).toBe("teste1");
  });

  it('update should update an intention by id', async () => {
    // Criar uma nova intenção para obter o ID
    const newIntention: IntentionEntity = {
      id: "46f912b9-e6b6-44a9-827f-660bb9c252e2",
      zipcode_start: "12313124141241",
      zipcode_end: '524745664',
      lead_id: "teste1"
    };
    const createdIntention: IntentionEntity = await intentionRepository.create(newIntention);

    // Atualizar a intenção usando o ID recuperado
    const updatedIntention = await intentionRepository.update(createdIntention.id, {
      id: createdIntention.id,
      zipcode_start: "Updated Start Zipcode",
      zipcode_end: "Updated End Zipcode",
      lead_id: "teste2"
    });

    // Verificar se a intenção foi atualizada corretamente
    expect(updatedIntention).toEqual({
      ...createdIntention,
      zipcode_start: "Updated Start Zipcode",
      zipcode_end: "Updated End Zipcode",
      lead_id: "teste2"
    });
  });
});
