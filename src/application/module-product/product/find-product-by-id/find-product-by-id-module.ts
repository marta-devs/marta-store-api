import { ZodValidator } from 'validator/zod/zod-validator';
import { ProductRepository } from 'infra/repositories/prisma/product-repository';
import { FindProductByIdController } from './find-product-by-id-controller';
import { findProductByIdSchema } from 'validator/zod/schema/find-product-by-id-schema';
import { FindProductByIdService } from './find-product-by-id-service';

const productRepository = new ProductRepository();
const zodValidator = new ZodValidator(findProductByIdSchema);
const findProductByIdService = new FindProductByIdService(productRepository);

const findProductByIdController = new FindProductByIdController(
	zodValidator,
	findProductByIdService,
);

export { findProductByIdController, findProductByIdService };
