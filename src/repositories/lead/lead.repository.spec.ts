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


    it('create should a new lead', async () => {
        const newLead: LeadEntity = {
            id: "teste1",
            name: "joao",
            email: 'joao@gmail.com',
        };

        const createdLead: LeadEntity = await leadRepository.create(newLead);

        expect(createdLead.id).toBe("teste1");
        expect(createdLead.name).toBe('joao');
        expect(createdLead.email).toBe("joao@gmail.com");
    })

})