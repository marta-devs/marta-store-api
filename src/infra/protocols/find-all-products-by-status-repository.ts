import { Product } from 'domain/product';

export type FindAllProductsByStatusRepositoryResponse = {
	products: Product[];
	result: number;
};

export interface FindAllProductsByStatusRepository {
	loadAllAndResultByStatus(
		status: string,
		page: number,
		limit: number,
	): Promise<FindAllProductsByStatusRepositoryResponse>;
}
