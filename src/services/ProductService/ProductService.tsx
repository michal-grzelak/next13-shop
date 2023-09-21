import { type ProductFragment, ProductsGetListDocument } from "@/gql/graphql"
import { DEFAULT_PAGE_SIZE } from "@services/constants"
import { type Pagination, type Product } from "@types"
import { executeGraphql } from "@services/graphql"

const mapGraphqlProductToProduct = (product: ProductFragment): Product => {
	return {
		id: product.id ?? "",
		title: product.attributes?.name ?? "",
		description: product.attributes?.description ?? "",
		price: product.attributes?.price ?? 0,
		category: product.attributes?.categories?.data[0].attributes?.name ?? "",
		image: {
			url: product.attributes?.images?.data[0].attributes?.url ?? "",
			alt: product.attributes?.images?.data[0].attributes?.alternativeText ?? "",
		},
		rating: product.attributes?.weightedRating ?? 0,
	}
}

export class ProductService {
	async getProducts({ page }: { page: number }): Promise<Pagination<Product>> {
		const res = await executeGraphql(ProductsGetListDocument, {
			pagination: { page, pageSize: DEFAULT_PAGE_SIZE },
		})

		if (!res.products) {
			return Promise.resolve({ data: [], meta: { page, pageCount: 0, pageSize: 0, total: 0 } })
		}

		return {
			meta: res.products.meta.pagination,
			data: res.products.data.map(mapGraphqlProductToProduct),
		}
	}

	async getProduct({ id }: { id: string }): Promise<Product | null> {
		return fetch(`https://naszsklep-api.vercel.app/api/products/${id}`)
			.then((res) => res.json() as Promise<Product>)
			.catch(() => Promise.resolve(null))
	}
}
