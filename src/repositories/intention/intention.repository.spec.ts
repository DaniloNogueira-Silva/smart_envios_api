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

afterEach( async () => {
  await prisma.intention.deleteMany();
  await prisma.lead.deleteMany();
})

it('should update intentions', async () => {
  // Criação dos leads
  const lead1: LeadEntity = {
    id: "intentionTeste1",
    name: "joao",
    email: 'joao@gmail.com',
  };

  const lead2: LeadEntity = {
    id: "intentionTeste2",
    name: "dasfadfasdasda",
    email: 'faasdadasdso@gmail.com',
  };

  const createdLead1: LeadEntity = await leadRepository.create(lead1);
  const createdLead2: LeadEntity = await leadRepository.create(lead2);

  expect(createdLead1.id).toBe("intentionTeste1");
  expect(createdLead1.name).toBe('joao');
  expect(createdLead1.email).toBe("joao@gmail.com");

  expect(createdLead2.id).toBe("intentionTeste2");
  expect(createdLead2.name).toBe('dasfadfasdasda');
  expect(createdLead2.email).toBe("faasdadasdso@gmail.com");

  // Criação da intention
  const intention: IntentionEntity = {
    id: "12313132sdsad",
    zipcode_start: "12313124141241",
    zipcode_end: '524745664',
    lead_id: createdLead1.id
  };

  const createdIntention: IntentionEntity = await intentionRepository.create(intention);

  expect(createdIntention.id).toBe("12313132sdsad");
  expect(createdIntention.zipcode_start).toBe('12313124141241');
  expect(createdIntention.zipcode_end).toBe("524745664");
  expect(createdIntention.lead_id).toBe(createdLead1.id);

  // Atualização da intention
  const updatedIntention: IntentionEntity = {
    id: createdIntention.id,
    zipcode_start: "12313124141241",
    zipcode_end: '524745664',
    lead_id: createdLead2.id
  };

  const updatedIntentionResult: IntentionEntity = await intentionRepository.update(updatedIntention.id, updatedIntention);

  expect(updatedIntentionResult.id).toBe(createdIntention.id);
  expect(updatedIntentionResult.zipcode_start).toBe('12313124141241');
  expect(updatedIntentionResult.zipcode_end).toBe("524745664");
  expect(updatedIntentionResult.lead_id).toBe(createdLead2.id);
});
