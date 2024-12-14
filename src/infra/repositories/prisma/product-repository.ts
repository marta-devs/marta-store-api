import { ProductStatus, Product } from 'domain/product';
import { FindProductByIdAndStatusRepository } from 'infra/protocols/find-product-by-id-and-status-remove-repository';
import { RemoveProductRepository } from 'infra/protocols/remove-product-repository';
import { prisma } from './config/prisma-client';
import { PrismaProductMapper } from './mappers/prisma-product-mapper';

export class ProductRepository
	implements RemoveProductRepository, FindProductByIdAndStatusRepository
{
	async remove(productId: string, status: string): Promise<void> {
		await prisma.products.update({
			where: {
				id: productId,
			},
			data: {
				status: status,
			},
		});
	}

	async loadByIdAndStatusRemoved(
		productId: string,
		status: ProductStatus,
	): Promise<Product | null> {
		const product = await prisma.products.findFirst({
			where: {
				id: productId,
				NOT: {
					status: status,
				},
			},
		});

		return product ? PrismaProductMapper.toDomain(product) : null;
	}
}
