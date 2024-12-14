import { RemoveProductRepository } from 'infra/protocols/remove-product-repository.js';

export enum ProductStatus {
	REMOVED = 'REMOVIDO',
}


export class RemoveProductService {
	constructor(
		private readonly removeProductRepository: RemoveProductRepository,
	) {}

	async execute(productId: string): Promise<void> {
		await this.removeProductRepository.remove(productId, ProductStatus.REMOVED);
	}
}
