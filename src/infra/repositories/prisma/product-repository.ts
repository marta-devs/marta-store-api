import { ProductStatus, Product } from 'domain/product';
import { FindProductByIdRepository } from 'infra/protocols/find-product-by-id-repository';
import { RemoveProductRepository } from 'infra/protocols/remove-product-repository';
import { prisma } from './config/prisma-client';
import { PrismaProductMapper } from './mappers/prisma-product-mapper';

export class ProductRepository
	implements RemoveProductRepository, FindProductByIdRepository
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

	async loadById(productId: string): Promise<Product | null> {
		const product = await prisma.products.findFirst({
			where: {
				id: productId,
			},
		});

		return product ? PrismaProductMapper.toDomain(product) : null;
	}
}
