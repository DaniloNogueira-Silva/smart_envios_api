import { PrismaClient } from '@prisma/client';
import { LeadEntity } from "../../domain/entities/lead.entity";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class LeadRepository {
  async create(data: LeadEntity): Promise<LeadEntity> {
    const {...leadData} = data;
    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        id: uuidv4(), // Gera um ID UUIDv4
      },
    });
    return lead;
  }
}
