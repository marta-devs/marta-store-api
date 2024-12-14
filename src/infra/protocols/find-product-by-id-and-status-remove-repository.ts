import { Product, ProductStatus } from 'domain/product.js';

export interface FindProductByIdAndStatusRepository {
	loadByIdAndStatusRemoved(
		productId: string,
		status: ProductStatus,
	): Promise<Product | null>;
}
