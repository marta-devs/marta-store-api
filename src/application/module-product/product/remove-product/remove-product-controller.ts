import {
	Controller,
	HttpRequest,
	HttpResponse,
} from 'api/protocols/controller';
import { Validator } from 'validator/protocols/validator';
import { RemoveProductService } from './remove-product-service';
import { BadRequestError } from 'utils/errors/bad-request-error';

export class RemoveProductController implements Controller {
	constructor(
		private readonly validator: Validator,
		private readonly removeProductService: RemoveProductService,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id } = httpRequest.params;
		const messageError = this.validator.validate({ id });

		if (messageError) {
			throw new BadRequestError(messageError);
		}

		await this.removeProductService.execute(id);

		return {
			status: 204,
			body: {
				message: 'Product deleted success',
			},
		};
	}
}
