import { ZodValidator } from 'validator/zod/zod-validator';
import { RemoveProductController } from './remove-product-controller';
import { RemoveProductService } from './remove-product-service';
import { removeProductSchema } from 'validator/zod/schema/remove-product-schema';
import { ProductRepository } from 'infra/repositories/prisma/product-repository';

const productRepository = new ProductRepository();
const zodValidator = new ZodValidator(removeProductSchema);
const removeProductService = new RemoveProductService(
	productRepository,
	productRepository,
);

const removeProductController = new RemoveProductController(
	zodValidator,
	removeProductService,
);

export { removeProductController, removeProductService };
