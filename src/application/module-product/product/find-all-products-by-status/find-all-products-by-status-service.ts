import { Product } from 'domain/product';
import { FindAllProductsByStatusRepository } from 'infra/protocols/products/find-all-products-by-status-repository';
import {
	FindAllProductsByStatusRequest,
	FindAllProductsByStatusResponse,
} from './find-all-products-by-status-DTO';

export class FindAllProductsByStatusService {
	constructor(
		private readonly findAllProductsByStatusRepository: FindAllProductsByStatusRepository,
	) {}

	async execute(
		params: FindAllProductsByStatusRequest,
	): Promise<FindAllProductsByStatusResponse> {
		const response =
			await this.findAllProductsByStatusRepository.loadAllAndResultByStatus(
				params.status,
				params.page,
				params.limit,
			);
		return response;
	}
}
