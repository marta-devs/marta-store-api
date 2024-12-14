import { products } from '@prisma/client';
import { Product, ProductStatus } from 'domain/product';

export class PrismaProductMapper {
	static toDomain(product: products): Product {
		return new Product({
			id: product.id,
			name: product.name,
			isExpiration: product.isExpiration,
			barCode: product.barCode,
			description: product.description ?? undefined,
			finalPrice: product.finalPrice ?? undefined,
			fixedProfit: product.fixedProfit ?? undefined,
			profitMargin: product.profitMargin ?? undefined,
			purchase_price: product.purchase_price ?? undefined,
			reason: product.reason ?? undefined,
			salePrice: product.salePrice ?? undefined,
			status: ProductStatus[product.status as keyof typeof ProductStatus],
			unitType: product.unitType ?? undefined,
		});
	}
}
