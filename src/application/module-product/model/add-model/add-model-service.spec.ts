import { describe, test, expect, vi } from 'vitest';
import { AddModelService } from './add-model-service';
import { FindModelByNameRepository } from 'infra/protocols/find-model-by-name-repository';
import { Model } from 'domain/model';
import { AddModelRepository } from 'infra/protocols/add-model-repository';

const makeFindModelByNameRepositoryStub = (): FindModelByNameRepository => {
	class FindModelByNameRepositoryStub implements FindModelByNameRepository {
		async findByName(name: string): Promise<Model | null> {
			return Promise.resolve(null);
		}
	}

	return new FindModelByNameRepositoryStub();
};

const makeAddModelRepositoryStub = (): AddModelRepository => {
	class AddModelRepositoryStub implements AddModelRepository {
		async add(param: Model): Promise<void> {
			return Promise.resolve();
		}
	}

	return new AddModelRepositoryStub();
};

describe('AddModelService', () => {
	test('should call FindModelByNameRepository with correct nome', async () => {
		const findModelByNameRepositoryStub = makeFindModelByNameRepositoryStub();
		const addModelRepositoryStub = makeAddModelRepositoryStub();
		const sut = new AddModelService(
			addModelRepositoryStub,
			findModelByNameRepositoryStub,
		);

		const name = 'any_name';
		const description = 'any_description';
		const findByNameSpy = vi.spyOn(findModelByNameRepositoryStub, 'findByName');
		await sut.add({
			name,
			description,
		});

		expect(findByNameSpy).toHaveBeenCalledWith(name);
	});

	test('should throw if FindModelByNameRepository throws error', async () => {
		const findModelByNameRepositoryStub = makeFindModelByNameRepositoryStub();
		const addModelRepositoryStub = makeAddModelRepositoryStub();
		const sut = new AddModelService(
			addModelRepositoryStub,
			findModelByNameRepositoryStub,
		);

		const name = 'any_name';
		const description = 'any_description';
		vi.spyOn(findModelByNameRepositoryStub, 'findByName').mockResolvedValueOnce(
			{
				id: 'any_id',
				name: 'any_name',
				description: 'any_description',
				createAt: new Date(),
				updateAt: new Date(),
			},
		);

		const response = sut.add({
			name,
			description,
		});

		expect(response).rejects.toThrowError('Model alright exists!');
	});

	test('should call AddModelRepository with correct params', async () => {
		const findModelByNameRepositoryStub = makeFindModelByNameRepositoryStub();
		const addModelRepositoryStub = makeAddModelRepositoryStub();
		const sut = new AddModelService(
			addModelRepositoryStub,
			findModelByNameRepositoryStub,
		);

		const name = 'any_name';
		const description = 'any_description';
		const addSpy = vi.spyOn(addModelRepositoryStub, 'add');
		await sut.add({
			name,
			description,
		});

		expect(addSpy).toHaveBeenCalledWith({
			name,
			description,
		});
	});

	test('should call AddModelRepository with correct nome', async () => {
		const findModelByNameRepositoryStub = makeFindModelByNameRepositoryStub();
		const addModelRepositoryStub = makeAddModelRepositoryStub();
		const sut = new AddModelService(
			addModelRepositoryStub,
			findModelByNameRepositoryStub,
		);

		const name = 'any_name';
		const description = 'any_description';
		vi.spyOn(addModelRepositoryStub, 'add').mockRejectedValueOnce(
			new Error('Internal Server Error'),
		);
		const response = sut.add({
			name,
			description,
		});

		expect(response).rejects.toThrowError('Internal Server Error');
	});
});
