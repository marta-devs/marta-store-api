export type ProductParam = {
	id?: string;
	name: string;
	unitType?: string;
	description?: string;
	barCode?: string;
	reason?: string;
	salePrice?: number;
	finalPrice?: number;
	profitMargin?: number;
	fixedProfit?: number;
	purchase_price?: number;
	isExpiration: boolean;
	status?: ProductStatus;
};

export enum ProductStatus {
	REMOVED = 'REMOVIDO',
  ACTIVE = 'ATIVADO',
  PENDING = 'PENDENTE'
}

export class Product {
	readonly id: string;
	readonly name: string;
	readonly unitType: string;
	readonly description: string;
	readonly barCode: string;
	readonly reason: string;
	readonly salePrice: number;
	readonly finalPrice: number;
	readonly profitMargin: number;
	readonly fixedProfit: number;
	readonly purchase_price: number;
	readonly isExpiration: boolean;
	readonly status: ProductStatus;

	constructor(private readonly params: ProductParam) {
		Object.assign(this, { ...params });
	}
}
