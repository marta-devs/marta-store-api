import { ModelRepository } from 'infra/repositories/prisma/model-repository';
import { AddModelController } from './add-model-controller';
import { AddModelService } from './add-model-service';
import { ZodValidator } from 'validator/zod/zod-validator';
import { AddModelSchema } from 'validator/zod/schema/add-model-schema';

const zodValidator = new ZodValidator(AddModelSchema);
const modelRepository = new ModelRepository();
const addModelService = new AddModelService(modelRepository, modelRepository);
const addModelController = new AddModelController(
	addModelService,
	zodValidator,
);

export { addModelController, AddModelService };
