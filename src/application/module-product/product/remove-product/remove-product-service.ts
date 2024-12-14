import { Product, ProductStatus } from 'domain/product';
import { FindProductByIdAndStatusRepository } from 'infra/protocols/find-product-by-id-and-status-remove-repository';
import { RemoveProductRepository } from 'infra/protocols/remove-product-repository';
import { NotFoundError } from 'utils/errors/not-found-error';

export class RemoveProductService {
	constructor(
		private readonly removeProductRepository: RemoveProductRepository,
		private readonly findProductByIdAndStatusRepository: FindProductByIdAndStatusRepository,
	) {}

	async execute(productId: string): Promise<void> {
		const productFound =
			await this.findProductByIdAndStatusRepository.loadByIdAndStatusRemoved(
				productId,
				ProductStatus.REMOVED,
			);

		if (!productFound) {
			throw new NotFoundError('Product is not exists!');
		}
		await this.removeProductRepository.remove(productId, ProductStatus.REMOVED);
	}
}
