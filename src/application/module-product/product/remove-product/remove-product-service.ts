import { ProductStatus } from 'domain/product';
import { FindProductByIdRepository } from 'infra/protocols/find-product-by-id-repository';
import { RemoveProductRepository } from 'infra/protocols/remove-product-repository';
import { ConflictError } from 'utils/errors/conflict-error';
import { NotFoundError } from 'utils/errors/not-found-error';

export class RemoveProductService {
	constructor(
		private readonly removeProductRepository: RemoveProductRepository,
		private readonly findProductByIdRepository: FindProductByIdRepository,
	) {}

	async execute(productId: string): Promise<void> {
		const productFound =
			await this.findProductByIdRepository.loadById(productId);

		if (!productFound) {
			throw new NotFoundError('Product is not exists!');
		}

		if (productFound.isStatusRemoved()) {
			throw new ConflictError('Product is Removed!');
		}
		await this.removeProductRepository.remove(productId, ProductStatus.REMOVED);
	}
}
