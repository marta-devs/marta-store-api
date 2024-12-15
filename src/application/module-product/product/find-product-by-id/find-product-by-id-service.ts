import { Product } from 'domain/product';
import { FindProductByIdRepository } from 'infra/protocols/find-product-by-id-repository';
import { ConflictError } from 'utils/errors/conflict-error';
import { NotFoundError } from 'utils/errors/not-found-error';

export class FindProductByIdService {
	constructor(
		private readonly findProductByIdRepository: FindProductByIdRepository,
	) {}

	async execute(productId: string): Promise<Product> {
		const productFound =
			await this.findProductByIdRepository.loadById(productId);

		if (!productFound) {
			throw new NotFoundError('Product is not exists!');
		}

		if (productFound.isStatusRemoved()) {
			throw new ConflictError('Product is Removed!');
		}

		return productFound;
	}
}
