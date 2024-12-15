import { Model } from 'domain/model';

export interface AddModelRepository {
	add(param: Model): Promise<void>;
}
