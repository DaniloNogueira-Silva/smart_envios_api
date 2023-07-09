import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";
import { LeadRepository } from "./lead.repository";
import { LeadEntity } from "../../domain/entities/lead.entity";

const prisma = new PrismaClient();

describe('Lead Repository Unit Test', () => {
  let leadRepository: LeadRepository;

  beforeAll(() => {
    leadRepository = new LeadRepository();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    // Limpar os dados após cada teste
    await prisma.lead.deleteMany();
  });

  it('create should create a new lead', async () => {
    const newLead: LeadEntity = {
      id: uuidv4(),
      name: "joao",
      email: 'joao@gmail.com',
    };

    const createdLead: LeadEntity = await leadRepository.create(newLead);

    expect(createdLead.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i); // Verifica se o ID é um UUIDv4 válido
    expect(createdLead.name).toBe('joao');
    expect(createdLead.email).toBe("joao@gmail.com");
  });

  it('create should create another new lead', async () => {
    const newLead: LeadEntity = {
      id: uuidv4(),
      name: "dasfadfasdasda",
      email: 'faasdadasdso@gmail.com',
    };

    const createdLead: LeadEntity = await leadRepository.create(newLead);

    expect(createdLead.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i); // Verifica se o ID é um UUIDv4 válido
    expect(createdLead.name).toBe('dasfadfasdasda');
    expect(createdLead.email).toBe("faasdadasdso@gmail.com");
  });
});
