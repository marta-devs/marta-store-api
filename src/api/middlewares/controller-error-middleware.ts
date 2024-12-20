import {
	Controller,
	HttpRequest,
	HttpResponse,
} from 'api/protocols/controller';

export class ControllerErrorMiddleware implements Controller {
	constructor(private readonly controller: Controller) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			return await this.controller.handle(httpRequest);
		} catch (error: any) {
			if (process.env.NODE_ENV === 'development') {
				console.log(error.stack);
			}
			return {
				status: error.statusCode || 500,
				body: {
					error: error.statusCode ? error.message : 'Internal Server Error',
				},
			};
		}
	}
}
