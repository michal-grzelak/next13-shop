import { type Pagination, type Product } from "@types";

const TAKE = 20;
export class ProductService {
	async getProducts({ page }: { page: number }): Promise<Pagination<Product>> {
		const offset = (page - 1) * TAKE;
		const params = new URLSearchParams({ offset: String(offset), take: String(TAKE) });

		return fetch(`https://naszsklep-api.vercel.app/api/products?${params.toString()}`)
			.then(async (res) => ({ data: (await res.json()) as Product[], page, pages: 3 }))
			.catch(() => Promise.resolve({ data: [], page, pages: 3 }));
	}

	async getProduct({ id }: { id: string }): Promise<Product | null> {
		return fetch(`https://naszsklep-api.vercel.app/api/products/${id}`)
			.then((res) => res.json() as Promise<Product>)
			.catch(() => Promise.resolve(null));
	}
}
