import {
	type ProductFragment,
	ProductsListGetDocument,
	ProductGetDocument,
	type ProductPaginationFragment,
} from "@/gql/graphql"
import { DEFAULT_PAGE_SIZE } from "@services/constants"
import { type Pagination, type Product } from "@types"
import { executeGraphql } from "@services/graphql"

const mapGraphqlProductToProduct = (product: ProductFragment): Product => {
	return {
		id: product.id,
		title: product.name,
		description: product.description,
		price: product.price,
		categories: product.categories,
		image: product.images[0]?.url ?? "#",
	}
}

const mapGraphqlPaginationToPagination = ({
	page,
	paginationMeta,
}: {
	paginationMeta: ProductPaginationFragment
	page: number
}): Pagination<unknown>["meta"] => ({
	page,
	pageCount: Math.ceil(paginationMeta.aggregate.count / DEFAULT_PAGE_SIZE),
	pageSize: DEFAULT_PAGE_SIZE,
})

export class ProductService {
	async getProducts({ page }: { page: number }): Promise<Pagination<Product>> {
		const skip = (page - 1) * DEFAULT_PAGE_SIZE

		const res = await executeGraphql(ProductsListGetDocument, {
			first: DEFAULT_PAGE_SIZE,
			skip,
		})

		if (!res.products) {
			return Promise.resolve({ data: [], meta: { page, pageCount: 0, pageSize: 0, total: 0 } })
		}

		return {
			meta: mapGraphqlPaginationToPagination({ page, paginationMeta: res.productsConnection }),
			data: res.products.map(mapGraphqlProductToProduct),
		}
	}

	async getProduct({ id }: { id: string }): Promise<Product | null> {
		const res = await executeGraphql(ProductGetDocument, {
			productId: id,
		})

		if (!res.product) {
			return null
		}

		return mapGraphqlProductToProduct(res.product)
	}
}
