import { RemoveProductRepository } from 'infra/protocols/remove-product-repository.js';
import { expect, test, vi, describe } from 'vitest';
import { ProductStatus, RemoveProductService } from './remove-product-service.js';

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
		const status = ProductStatus.REMOVED;
		const removeProductRepositoryStub = makeRemoveProductRepositoryStub();
		const sut = new RemoveProductService(removeProductRepositoryStub);
		const removeSpy = vi.spyOn(removeProductRepositoryStub, 'remove');
		await sut.execute(productId);
		expect(removeSpy).toHaveBeenCalledWith(productId, status);
	});
});
