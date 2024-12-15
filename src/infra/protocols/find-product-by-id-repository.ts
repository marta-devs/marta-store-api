import { Product } from 'domain/product.js';

export interface FindProductByIdRepository {
	loadById(productId: string): Promise<Product | null>;
}
