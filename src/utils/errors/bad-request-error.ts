import { ApiError } from 'utils/errors/api-error';

export class BadRequestError extends ApiError {
	constructor(message: string) {
		super(message, 400);
	}
}
