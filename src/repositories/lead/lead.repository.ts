import {PrismaClient } from '@prisma/client';
import { LeadEntity } from '../../entities/lead.entity';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

export class LeadRepository{
    async create(data: LeadEntity): Promise<LeadEntity>{
        const postId = uuidv4();
        const {...leadData} = data;
        const lead = await prisma.lead.create({
            data: {
                id: postId,
                ...leadData,
            },
        });
        return lead
    }
}