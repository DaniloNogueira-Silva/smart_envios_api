import { PrismaClient } from "@prisma/client";
import { LeadRepository } from "./lead.repository";
import { LeadEntity } from "../../entities/lead.entity";

const prisma = new PrismaClient();

describe('Lead Repository Unit Test', () => {
    let leadRepository : LeadRepository;

    beforeAll(() => {
        leadRepository = new LeadRepository();
    })

    afterAll(async () => {
        await prisma.$disconnect();
    });

    afterEach(async () => {
        await prisma.lead.deleteMany();
    })

    it('create should a new lead', async () => {
        const newLead: LeadEntity = {
            id: "46f912b9-e6b6-44a9-827f-660bb9c252e2",
            name: "joao",
            email: 'joao@gmail.com',
        };

        const createdLead: LeadEntity = await leadRepository.create(newLead);

        expect(createdLead.id).toBe("46f912b9-e6b6-44a9-827f-660bb9c252e2");
        expect(createdLead.name).toBe('joao');
        expect(createdLead.email).toBe("joao@gmail.com");
    })
})