import * as z from 'zod';

export const removeProductSchema = z.object({
	id: z
		.string({
			required_error: 'id is required',
			invalid_type_error: 'id type is string',
		})
		.min(1, {
			message: 'id is not empty',
		}),
});
