import { expect, vi, test, describe } from 'vitest';
import { FindProductByIdService } from './find-product-by-id-service';
import { FindProductByIdRepository } from 'infra/protocols/find-product-by-id-repository';
import { Product, ProductStatus } from 'domain/product';

interface SutType {
	sut: FindProductByIdService;
	findProductByIdRepositoryStub: FindProductByIdRepository;
}

const fakeProduct = (status: ProductStatus = ProductStatus.ACTIVE): Product => {
	return new Product({
		id: 'any_id',
		name: 'any_name',
		isExpiration: false,
		status: status,
	});
};

const makeFindProductByIdRepositoryStub = (): FindProductByIdRepository => {
	class FindProductByIdRepositoryStub implements FindProductByIdRepository {
		async loadById(id: string): Promise<Product> {
			return Promise.resolve(fakeProduct());
		}
	}
	return new FindProductByIdRepositoryStub();
};

const makeSut = (): SutType => {
	const findProductByIdRepositoryStub = makeFindProductByIdRepositoryStub();
	const sut = new FindProductByIdService(findProductByIdRepositoryStub);

	return {
		sut,
		findProductByIdRepositoryStub,
	};
};

describe('FindProductByIdService', () => {
	test('should call FindProductByIdRepository with correct id', async () => {
		const productId = 'any_id';
		const { sut, findProductByIdRepositoryStub } = makeSut();
		const loadSpy = vi.spyOn(findProductByIdRepositoryStub, 'loadById');
		await sut.execute(productId);
		expect(loadSpy).toHaveBeenCalledWith(productId);
	});

	test('should throw if FindProductByIdRepository return null', async () => {
		const { sut, findProductByIdRepositoryStub } = makeSut();
		vi.spyOn(findProductByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
			null,
		);
		const response = sut.execute('any_id');
		await expect(response).rejects.toThrow('Product is not exists!');
	});

	test('should throw if FindProductByIdRepository return status REMOVED', async () => {
		const { sut, findProductByIdRepositoryStub } = makeSut();
		vi.spyOn(findProductByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
			fakeProduct(ProductStatus.REMOVED),
		);
		const response = sut.execute('any_id');
		await expect(response).rejects.toThrow();
	});

	test('should throw if FindProductByIdRepository throw error', async () => {
		const { sut, findProductByIdRepositoryStub } = makeSut();
		vi.spyOn(findProductByIdRepositoryStub, 'loadById').mockRejectedValueOnce(
			new Error(),
		);
		const response = sut.execute('any_id');
		await expect(response).rejects.toThrow();
	});
});
