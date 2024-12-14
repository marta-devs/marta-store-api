import { RemoveProductRepository } from 'infra/protocols/remove-product-repository.js';
import { expect, test, vi, describe } from 'vitest';
import { ProductStatus, RemoveProductService } from './remove-product-service.js';

interface SutType {
  sut: RemoveProductService
  removeProductRepositoryStub: RemoveProductRepository
}

const makeSut = ():SutType => {
  const removeProductRepositoryStub = makeRemoveProductRepositoryStub();
  const sut = new RemoveProductService(removeProductRepositoryStub);

  return {
    sut,
    removeProductRepositoryStub
  }
}

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
    const {sut, removeProductRepositoryStub} = makeSut()
		const removeSpy = vi.spyOn(removeProductRepositoryStub, 'remove');
		await sut.execute(productId);
		expect(removeSpy).toHaveBeenCalledWith(productId, ProductStatus.REMOVED);
	});

  test('should throw if RemoveProductRepository throws', async () => {
		const productId = 'any_id';
    const {sut, removeProductRepositoryStub} = makeSut()
		vi.spyOn(removeProductRepositoryStub, 'remove').mockRejectedValueOnce(new Error())
		const response = sut.execute(productId);
		expect(response).rejects.toThrowError();
	});
});
