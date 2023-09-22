import {
	type ProductFragment,
	ProductGetDocument,
	type ProductPaginationFragment,
	ProductsListGetDocument,
} from "@gql/graphql"
import { DEFAULT_PAGE_SIZE } from "@services/constants"
import { executeGraphql } from "@services/graphql"
import { type Pagination } from "@types"

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
	async getProducts({ page }: { page: number }): Promise<Pagination<ProductFragment>> {
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
			data: res.products,
		}
	}

	async getProduct({ id }: { id: string }): Promise<ProductFragment | null> {
		const res = await executeGraphql(ProductGetDocument, {
			productId: id,
		})

		if (!res.product) {
			return null
		}

		return res.product
	}
}
