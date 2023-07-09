import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";
import { IntentionRepository } from "./intention.repository";
import { IntentionEntity } from "../../domain/entities/intention.entity";
import { LeadRepository } from "../lead/lead.repository";
import { LeadEntity } from "../../domain/entities/lead.entity";

const prisma = new PrismaClient();
let leadRepository: LeadRepository;
let intentionRepository: IntentionRepository;

beforeAll(() => {
  leadRepository = new LeadRepository();
  intentionRepository = new IntentionRepository();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.intention.deleteMany();
  await prisma.lead.deleteMany();
});

afterEach(async () => {
  await prisma.intention.deleteMany();
  await prisma.lead.deleteMany();
});

it('should update intentions', async () => {
  // Criação do lead
  const lead: LeadEntity = {
    id: uuidv4(),
    name: "joao",
    email: 'joao@gmail.com',
  };

  const createdLead: LeadEntity = await leadRepository.create(lead);

  expect(createdLead.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  expect(createdLead.name).toBe('joao');
  expect(createdLead.email).toBe("joao@gmail.com");

  // Criação da intention
  const intention: IntentionEntity = {
    id: uuidv4(),
    zipcode_start: "12313124141241",
    zipcode_end: '524745664',
    lead_id: createdLead.id
  };

  const createdIntention: IntentionEntity = await intentionRepository.create(intention);

  expect(createdIntention.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  expect(createdIntention.zipcode_start).toBe('12313124141241');
  expect(createdIntention.zipcode_end).toBe("524745664");
  expect(createdIntention.lead_id).toBe(createdLead.id);

  // Atualização da intention
  const updatedIntention: IntentionEntity = {
    id: createdIntention.id,
    zipcode_start: "12313124141241",
    zipcode_end: '524745664',
    lead_id: createdLead.id
  };

  const updatedIntentionResult: IntentionEntity = await intentionRepository.update(updatedIntention.id, updatedIntention);

  expect(updatedIntentionResult.id).toBe(createdIntention.id);
  expect(updatedIntentionResult.zipcode_start).toBe('12313124141241');
  expect(updatedIntentionResult.zipcode_end).toBe("524745664");
  expect(updatedIntentionResult.lead_id).toBe(createdLead.id);
});
