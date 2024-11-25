import {
	Controller,
	HttpRequest,
	HttpResponse,
} from 'api/protocols/controller';
import { ApiError } from 'utils/errors/api-error';

export class ControllerErrorMiddleware implements Controller {
	constructor(private readonly controller: Controller) {}

	async handle(params: HttpRequest): Promise<HttpResponse> {
		try {
			const response = await this.controller.handle(params);
			return {
				status: response.status,
				body: response.body,
			};
		} catch (error: any) {
			return {
				status: error.statusCode || 500,
				body: {
					error: error.statusCode ? error.message : 'Internal Server Error',
				},
			};
		}
	}
}
