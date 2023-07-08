import { PrismaClient } from '@prisma/client';
import { IntentionEntity } from '../../domain/entities/intention.entity';
import { LeadRepository } from '../lead/lead.repository'; 
import { LeadEntity } from '../../domain/entities/lead.entity'; 

const prisma = new PrismaClient();

export class IntentionRepository {
  async create(data: IntentionEntity): Promise<IntentionEntity> {
    const { ...intentionData } = data;
    const intention = await prisma.intention.create({
      data: {
        ...intentionData,
      },
    });
    return intention;
  }

  async update(id: string, data: IntentionEntity): Promise<IntentionEntity | null> {
    const intention = await prisma.intention.update({
      where: { id },
      data,
    });
    if (!intention) {
      return null;
    }
    return intention;
  }
}
