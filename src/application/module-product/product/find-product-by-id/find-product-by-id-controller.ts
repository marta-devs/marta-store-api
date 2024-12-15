import {
	Controller,
	HttpRequest,
	HttpResponse,
} from 'api/protocols/controller';
import { FindProductByIdService } from './find-product-by-id-service';
import { Validator } from 'validator/protocols/validator';
import { BadRequestError } from 'utils/errors/bad-request-error';

export class FindProductByIdController implements Controller {
	constructor(
		private readonly validator: Validator,
		private readonly findProductByIdService: FindProductByIdService,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const { id } = httpRequest.params;
		const messageError = this.validator.validate({ id });

		if (messageError) {
			throw new BadRequestError(messageError);
		}

		const product = await this.findProductByIdService.execute(id);

		return {
			status: 200,
			body: product,
		};
	}
}
