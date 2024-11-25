import { z } from 'zod';
import { Validator } from './../protocols/validator';

export class ZodValidator implements Validator {
	constructor(
		private readonly schema: z.ZodObject<any, 'strip', z.ZodTypeAny, any, any>,
	) {}

	validate(input: object): string | null {
		const response = this.schema.safeParse(input);
		if (!response.success) {
			return JSON.parse(response.error.toString())[0].message;
		}
		return null;
	}
}
