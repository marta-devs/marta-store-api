import * as z from 'zod';

export const AddModelSchema = z.object({
	name: z
		.string({
			required_error: 'name is required',
			invalid_type_error: 'name type is string',
		})
		.min(5, 'characters in the name must be at min 5')
		.max(160, 'characters in the name must be max 160'),
	description: z
		.string({ invalid_type_error: 'description type is string' })
		.min(5, 'characters in the description must be at min 5')
		.max(255, 'characters in the description must be max 160'),
});
