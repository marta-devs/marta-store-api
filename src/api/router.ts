import { addModelController } from 'application/module-product/model/add-model/add-model-module';
import { HttpServer, MethodEnum } from './protocols/http-server';
import { removeProductController } from 'application/module-product/product/remove-product/remove-product-module';
import { findProductByIdController } from 'application/module-product/product/find-product-by-id/find-product-by-id-module';

export default class Router {
	constructor(private readonly httpServer: HttpServer) {}

	async init() {
		this.httpServer.route(MethodEnum.POST, '/models', addModelController);
		this.httpServer.route(
			MethodEnum.DELETE,
			'/products/:id',
			removeProductController,
		);
		this.httpServer.route(
			MethodEnum.GET,
			'/products/:id',
			findProductByIdController,
		);
	}
}
