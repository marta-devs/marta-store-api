import { AddModelRepository } from 'infra/protocols/models/add-model-repository';
import { AddModelRequest, AddModelResponse } from './add-model-DTO';
import { FindModelByNameRepository } from 'infra/protocols/find-model-by-name-repository';
import { ConflictError } from 'utils/errors/conflict-error';

export class AddModelService {
	constructor(
		private readonly addModelRepository: AddModelRepository,
		private readonly findModelByNameRepository: FindModelByNameRepository,
	) {}

	async add(param: AddModelRequest): Promise<void> {
		const model = await this.findModelByNameRepository.findByName(param.name);

		if (model) {
			throw new ConflictError('Model alright exists!');
		}

		await this.addModelRepository.add(param);
	}
}
