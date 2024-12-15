import { ZodValidator } from 'validator/zod/zod-validator';
import { ProductRepository } from 'infra/repositories/prisma/product-repository';
import { FindAllProductsByStatusService } from './find-all-products-by-status-service';
import { FindAllProductByStatusController } from './find-all-products-by-status-controller';
import { findAllProductByStatusSchema } from 'validator/zod/schema/find-all-products-by-status-schema';

const productRepository = new ProductRepository();
const zodValidator = new ZodValidator(findAllProductByStatusSchema);
const findAllProductsByStatusService = new FindAllProductsByStatusService(
	productRepository,
);

const findAllProductByStatusController = new FindAllProductByStatusController(
	zodValidator,
	findAllProductsByStatusService,
);

export { findAllProductByStatusController, findAllProductsByStatusService };
