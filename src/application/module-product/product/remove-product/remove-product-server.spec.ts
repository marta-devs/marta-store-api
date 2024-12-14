import { RemoveProductRepository } from 'infra/protocols/remove-product-repository';
import { expect, test, vi, describe } from 'vitest';
import { RemoveProductService } from './remove-product-service';
import { Product, ProductStatus } from 'domain/product';
import { FindProductByIdAndStatusRepository } from 'infra/protocols/find-product-by-id-and-status-remove-repository';

interface SutType {
	sut: RemoveProductService;
	removeProductRepositoryStub: RemoveProductRepository;
	findProductByIdAndStatusRepositoryStub: FindProductByIdAndStatusRepository;
}

const makeSut = (): SutType => {
	const removeProductRepositoryStub = makeRemoveProductRepositoryStub();
	const findProductByIdAndStatusRepositoryStub =
		makeFindProductByIdAndStatusRepositoryStub();
	const sut = new RemoveProductService(
		removeProductRepositoryStub,
		findProductByIdAndStatusRepositoryStub,
	);

	return {
		sut,
		removeProductRepositoryStub,
		findProductByIdAndStatusRepositoryStub,
	};
};

const makeFindProductByIdAndStatusRepositoryStub =
	(): FindProductByIdAndStatusRepository => {
		class FindProductByIdAndStatusRepositoryStub
			implements FindProductByIdAndStatusRepository
		{
			async loadByIdAndStatusRemoved(): Promise<Product> {
				return Promise.resolve(
					new Product({
						id: 'any_id',
						name: 'any_name',
						isExpiration: false,
					}),
				);
			}
		}
		return new FindProductByIdAndStatusRepositoryStub();
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

	test('should throw if FindProductByIdAndStatusRepository return null', async () => {
		const { sut, findProductByIdAndStatusRepositoryStub } = makeSut();
		vi.spyOn(
			findProductByIdAndStatusRepositoryStub,
			'loadByIdAndStatusRemoved',
		).mockResolvedValueOnce(null);
		const response = sut.execute('any_id');
		await expect(response).rejects.toThrow('Product is not exists!');
	});
});
