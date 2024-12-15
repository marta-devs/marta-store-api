import { ProductStatus, Product } from 'domain/product';
import { FindProductByIdRepository } from 'infra/protocols/products/find-product-by-id-repository';
import { RemoveProductRepository } from 'infra/protocols/products/remove-product-repository';
import { prisma } from './config/prisma-client';
import { PrismaProductMapper } from './mappers/prisma-product-mapper';
import {
	FindAllProductsByStatusRepository,
	FindAllProductsByStatusRepositoryResponse,
} from 'infra/protocols/products/find-all-products-by-status-repository';

export class ProductRepository
	implements
		RemoveProductRepository,
		FindProductByIdRepository,
		FindAllProductsByStatusRepository
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

	async loadAllAndResultByStatus(
		status: string,
		page: number,
		limit: number,
	): Promise<FindAllProductsByStatusRepositoryResponse> {
		const [products, totalProduct] = await prisma.$transaction([
			prisma.products.findMany({
				where:
					status !== ProductStatus.REMOVED
						? { NOT: { status: ProductStatus.REMOVED } }
						: { status: ProductStatus.REMOVED },
			}),
			prisma.products.count(),
		]);

		const newProducts = products.map((product) =>
			PrismaProductMapper.toDomain(product),
		);

		return {
			products: newProducts,
			result: totalProduct,
		};
	}
}
