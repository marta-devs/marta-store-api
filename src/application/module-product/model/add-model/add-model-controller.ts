import {
	Controller,
	HttpRequest,
	HttpResponse,
} from 'api/protocols/controller';
import { AddModelService } from './add-model-service';
import { Validator } from 'validator/protocols/validator';
import { BadRequestError } from 'utils/errors/bad-request-error';

export class AddModelController implements Controller {
	constructor(
		private readonly addModelService: AddModelService,
		private readonly validator: Validator,
	) {}
	async handle(params: HttpRequest): Promise<HttpResponse> {
		const request = params.body;
		const messageError = this.validator.validate(request);

		if (messageError) {
			throw new BadRequestError(messageError);
		}

		await this.addModelService.add(request);

		return {
			status: 201,
			body: {
				message: 'Model created success!',
			},
		};
	}
}
