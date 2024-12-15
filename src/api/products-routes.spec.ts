import { describe, expect, vi, test } from 'vitest';
import request from 'supertest';
import ExpressAdapter from 'api/express/express-adapter';
import Router from 'api/router';
import { prisma } from 'infra/repositories/prisma/config/prisma-client';
import { ProductStatus } from 'domain/product';

const httpServer = new ExpressAdapter();
const router = new Router(httpServer);

router.init();

async function createFakeProduct() {
	return await prisma.products.create({
		data: {
			name: 'any_name',
			status: ProductStatus.ACTIVE,
			barCode: 'any_barcode',
			reason: 'any_reason',
		},
	});
}

describe('DELETE /products/:id', () => {
	test('should return 204 on success', async () => {
		const product = await createFakeProduct();
		const response = await request(httpServer.getApp()).delete(
			`/products/${product.id}`,
		);
		expect(response.status).toBe(204);
	});
});

describe('GET /products/:id', () => {
	test('should return 204 on success', async () => {
		const product = await createFakeProduct();
		const response = await request(httpServer.getApp()).get(
			`/products/${product.id}`,
		);
		expect(response.status).toBe(200);
	});
});
