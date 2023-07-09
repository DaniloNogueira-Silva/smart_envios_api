import { PrismaClient } from '@prisma/client';
import { IntentionEntity } from '../../domain/entities/intention.entity';
import { LeadRepository } from '../lead/lead.repository';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class IntentionRepository {
  async create(data: IntentionEntity): Promise<IntentionEntity> {
    const { lead_id, ...intentionData } = data;
    const intention = await prisma.intention.create({
      data: {
        ...intentionData,
        lead: {
          connect: { id: lead_id },
        },
        id: uuidv4(),
      },
    });
    return intention;
  }

  async update(id: string, data: IntentionEntity): Promise<IntentionEntity | null> {
    const { lead_id, ...intentionData } = data;
    const intention = await prisma.intention.update({
      where: { id },
      data: {
        ...intentionData,
        lead: {
          connect: { id: lead_id },
        },
      },
    });
    if (!intention) {
      return null;
    }
    return intention;
  }
}
