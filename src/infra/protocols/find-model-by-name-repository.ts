import { Model } from 'domain/model';

export interface FindModelByNameRepository {
	findByName(name: string): Promise<Model>;
}
