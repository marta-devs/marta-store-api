import { FindModelByNameRepository } from './../../protocols/find-model-by-name-repository';
import { Model } from 'domain/model';
import { AddModelRepository } from './../../protocols/add-model-repository';
import { prisma } from './config/prisma-client';

export class ModelRepository
	implements AddModelRepository, FindModelByNameRepository
{
	async add(param: Model): Promise<void> {
		await prisma.tb_model.create({
			data: {
				name: param.name,
				description: param.description,
			},
		});
	}
	async findByName(name: string): Promise<Model | null> {
		const response = await prisma.tb_model.findFirst({
			where: {
				name,
			},
		});

		return response;
	}
}
