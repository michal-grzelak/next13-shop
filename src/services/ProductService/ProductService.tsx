import { type Product } from "@types";

const TAKE = 20;
export class ProductService {
	async getProducts({ page }: { page: number }): Promise<Product[]> {
		const offset = (page - 1) * TAKE;
		const params = new URLSearchParams({ offset: String(offset), take: String(TAKE) });

		return fetch(`https://naszsklep-api.vercel.app/api/products?${params.toString()}`)
			.then((res) => res.json() as Promise<Product[]>)
			.catch(() => Promise.resolve([]));
	}

	async getProduct({ id }: { id: string }): Promise<Product | null> {
		return fetch(`https://naszsklep-api.vercel.app/api/products/${id}`)
			.then((res) => res.json() as Promise<Product>)
			.catch(() => Promise.resolve(null));
	}
}
