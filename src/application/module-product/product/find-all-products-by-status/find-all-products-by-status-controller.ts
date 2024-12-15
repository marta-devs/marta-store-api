import {
	Controller,
	HttpRequest,
	HttpResponse,
} from 'api/protocols/controller';
import { Validator } from 'validator/protocols/validator';
import { BadRequestError } from 'utils/errors/bad-request-error';
import { FindAllProductsByStatusService } from './find-all-products-by-status-service';

export class FindAllProductByStatusController implements Controller {
	constructor(
		private readonly validator: Validator,
		private readonly findAllProductsByStatusService: FindAllProductsByStatusService,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const query = httpRequest.query;
		const page = parseInt(query.page);
		const limit = parseInt(query.limit);

		const messageError = this.validator.validate({
			status: query.status,
			page,
			limit,
		});

		if (messageError) {
			throw new BadRequestError(messageError);
		}

		const productsAndResult = await this.findAllProductsByStatusService.execute(
			{
				status: query.status,
				page,
				limit,
			},
		);

		return {
			status: 200,
			body: productsAndResult,
		};
	}
}
