export interface RemoveProductRepository {
	remove(productId: string, status: string): Promise<void>;
}
