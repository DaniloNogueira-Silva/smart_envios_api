import { FastifyRequest, FastifyReply } from "fastify";
import { IntentionEntity } from "../../../domain/entities/intention.entity";
import { IntentionRepository } from "../../../repositories/intention/intention.repository";
import { intentionValidation } from "../../../domain/validations/intention.validation";

type MyRequest = FastifyRequest;
type MyReply = FastifyReply;

type RequestHandler = (req: MyRequest, res: MyReply) => Promise<void>;

export class IntentionController {
  repository: IntentionRepository;

  constructor(repository: IntentionRepository) {
    this.repository = repository;
  }

  create: RequestHandler = async (req, res) => {
    await intentionValidation.validate(req.body)
    const intentionInterface: IntentionEntity = req.body as IntentionEntity;
    const intention: IntentionEntity = await this.repository.create(
      intentionInterface
    );
    res.send(intention);
  };

  update: RequestHandler = async (req, res) => {
    const intentionInterface: IntentionEntity = req.body as IntentionEntity;
    const params = req.params as { id: string }; // Verificação de tipo para acessar 'id'

    if (typeof params.id !== "string") {
      res.status(400).send({ error: "Invalid id" });
      return;
    }

    const intention: IntentionEntity | null = await this.repository.update(
      params.id,
      intentionInterface
    );
    if (!intention) {
      res.status(404).send({ error: "Intention not found" });
      return;
    }
    res.send(intention);
  };
}
