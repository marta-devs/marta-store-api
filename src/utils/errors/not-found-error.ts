import { ApiError } from 'utils/errors/api-error';

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super(message, 404);
	}
}
