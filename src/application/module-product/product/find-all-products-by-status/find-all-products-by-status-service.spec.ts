import { Product, ProductStatus } from 'domain/product';
import { expect, vi, test, describe } from 'vitest';
import { FindAllProductsByStatusService } from './find-all-products-by-status-service';
import {
	FindAllProductsByStatusRepository,
	FindAllProductsByStatusRepositoryResponse,
} from 'infra/protocols/products/find-all-products-by-status-repository';

interface SutType {
	sut: FindAllProductsByStatusService;
	findAllProductsByStatusRepositoryStub: FindAllProductsByStatusRepository;
}

const fakeProduct = (status: ProductStatus = ProductStatus.ACTIVE): Product => {
	return new Product({
		id: 'any_id',
		name: 'any_name',
		isExpiration: false,
		status: status,
	});
};

const makeFindAllProductsAndResultByStatusRepositoryStub =
	(): FindAllProductsByStatusRepository => {
		class FindAllProductsByStatusRepositoryStub
			implements FindAllProductsByStatusRepository
		{
			async loadAllAndResultByStatus(
				status: string,
				page: number,
				limit: number,
			): Promise<FindAllProductsByStatusRepositoryResponse> {
				return Promise.resolve({
					products: [fakeProduct()],
					result: 1,
				});
			}
		}
		return new FindAllProductsByStatusRepositoryStub();
	};

const makeSut = (): SutType => {
	const findAllProductsByStatusRepositoryStub =
		makeFindAllProductsAndResultByStatusRepositoryStub();
	const sut = new FindAllProductsByStatusService(
		findAllProductsByStatusRepositoryStub,
	);

	return {
		sut,
		findAllProductsByStatusRepositoryStub,
	};
};

describe('FindAllProductsByStatusService', () => {
	test('should call FindAllProductsAndResultByStatusRepository with correct params', async () => {
		const fakeRequest = {
			limit: 30,
			page: 10,
			status: ProductStatus.ACTIVE,
		};
		const { sut, findAllProductsByStatusRepositoryStub } = makeSut();
		const loadAllAndResultByStatusSpy = vi.spyOn(
			findAllProductsByStatusRepositoryStub,
			'loadAllAndResultByStatus',
		);
		await sut.execute(fakeRequest);
		expect(loadAllAndResultByStatusSpy).toHaveBeenCalledWith(
			fakeRequest.status,
			fakeRequest.page,
			fakeRequest.limit,
		);
	});

	test('should throw if FindAllProductsAndResultByStatusRepository throws', async () => {
		const { sut, findAllProductsByStatusRepositoryStub } = makeSut();
		vi.spyOn(
			findAllProductsByStatusRepositoryStub,
			'loadAllAndResultByStatus',
		).mockRejectedValueOnce(new Error());
		const response = sut.execute({
			limit: 30,
			page: 10,
			status: ProductStatus.ACTIVE,
		});
		await expect(response).rejects.toThrowError();
	});

	test('should return products and result if FindAllProductsAndResultByStatusRepository on success', async () => {
		const { sut } = makeSut();
		const response = await sut.execute({
			limit: 30,
			page: 10,
			status: ProductStatus.ACTIVE,
		});
		expect(response).toEqual({ products: [fakeProduct()], result: 1 });
	});
});
