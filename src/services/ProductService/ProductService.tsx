import { type Product } from "@types";

export class ProductService {
	async getProducts({ page }: { page: number }): Promise<Product[]> {
		const offset = (page - 1) * 20;
		const params = new URLSearchParams({ offset: String(offset) });

		return fetch(`https://naszsklep-api.vercel.app/api/products?${params.toString()}`)
			.then((res) => res.json() as Promise<Product[]>)
			.catch(() => Promise.resolve([]));
	}
}
