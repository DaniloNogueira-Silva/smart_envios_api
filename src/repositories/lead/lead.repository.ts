import {PrismaClient } from '@prisma/client';
import { LeadEntity } from "../../domain/entities/lead.entity"; 

const prisma = new PrismaClient();

export class LeadRepository{
    async create(data: LeadEntity): Promise<LeadEntity>{
        const {...leadData} = data;
        const lead = await prisma.lead.create({
            data: {
                ...leadData,
            },
        });
        return lead
    }
}