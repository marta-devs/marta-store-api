import * as z from 'zod';

export const findAllProductByStatusSchema = z.object({
	status: z
		.string({
			required_error: 'id is required',
			invalid_type_error: 'id type is string',
		})
		.min(1, {
			message: 'id is not empty',
		})
		.toUpperCase(),
	page: z.number(),
	limit: z.number(),
});
