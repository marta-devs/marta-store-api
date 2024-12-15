import { Product } from 'domain/product';

export interface FindAllProductsByStatusRequest {
	page: number;
	limit: number;
	status: string;
}

export interface FindAllProductsByStatusResponse {
	products: Product[];
	result: number;
}
