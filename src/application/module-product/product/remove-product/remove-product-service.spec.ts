import { RemoveProductRepository } from 'infra/protocols/products/remove-product-repository';
import { expect, test, vi, describe } from 'vitest';
import { RemoveProductService } from './remove-product-service';
import { Product, ProductStatus } from 'domain/product';
import { FindProductByIdRepository } from 'infra/protocols/products/find-product-by-id-repository';

interface SutType {
	sut: RemoveProductService;
	removeProductRepositoryStub: RemoveProductRepository;
	findProductByIdRepositoryStub: FindProductByIdRepository;
}

const makeSut = (): SutType => {
	const removeProductRepositoryStub = makeRemoveProductRepositoryStub();
	const findProductByIdRepositoryStub = makeFindProductByIdRepositoryStub();
	const sut = new RemoveProductService(
		removeProductRepositoryStub,
		findProductByIdRepositoryStub,
	);

	return {
		sut,
		removeProductRepositoryStub,
		findProductByIdRepositoryStub,
	};
};

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
			return Promise.resolve(
				new Product({
					id: 'any_id',
					name: 'any_name',
					isExpiration: false,
					status: ProductStatus.ACTIVE,
				}),
			);
		}
	}
	return new FindProductByIdRepositoryStub();
};

const makeRemoveProductRepositoryStub = (): RemoveProductRepository => {
	class RemoveProductRepositoryStub implements RemoveProductRepository {
		async remove(productId: string, status: string): Promise<void> {
			Promise.resolve();
		}
	}

	return new RemoveProductRepositoryStub();
};

describe('RemoveProductService', () => {
	test('should call RemoveProductRepository with correct params', async () => {
		const productId = 'any_id';
		const { sut, removeProductRepositoryStub } = makeSut();
		const removeSpy = vi.spyOn(removeProductRepositoryStub, 'remove');
		await sut.execute(productId);
		expect(removeSpy).toHaveBeenCalledWith(productId, ProductStatus.REMOVED);
	});

	test('should throw if RemoveProductRepository throws', async () => {
		const { sut, removeProductRepositoryStub } = makeSut();
		vi.spyOn(removeProductRepositoryStub, 'remove').mockRejectedValueOnce(
			new Error(),
		);
		const response = sut.execute('any_id');
		await expect(response).rejects.toThrowError();
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

	test('should call FindProductByIdRepository with correct id', async () => {
		const productId = 'any_id';
		const { sut, findProductByIdRepositoryStub } = makeSut();
		const loadSpy = vi.spyOn(findProductByIdRepositoryStub, 'loadById');
		await sut.execute(productId);
		expect(loadSpy).toHaveBeenCalledWith(productId);
	});
});
