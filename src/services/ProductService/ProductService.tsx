import {
	type ProductFragment,
	ProductGetDocument,
	type ProductPaginationFragment,
	ProductsListGetDocument,
	ProductsListGetByCategorySlugDocument,
	ProductsListGetByCollectionSlugDocument,
	ProductsListRelatedGetDocument,
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

	async getProductsByCategorySlug({
		page,
		categorySlug,
	}: {
		page: number
		categorySlug: string
	}): Promise<Pagination<ProductFragment>> {
		const skip = (page - 1) * DEFAULT_PAGE_SIZE

		const res = await executeGraphql(ProductsListGetByCategorySlugDocument, {
			first: DEFAULT_PAGE_SIZE,
			skip,
			categorySlug,
		})

		if (!res.products) {
			return Promise.resolve({ data: [], meta: { page, pageCount: 0, pageSize: 0, total: 0 } })
		}

		return {
			meta: mapGraphqlPaginationToPagination({ page, paginationMeta: res.productsConnection }),
			data: res.products,
		}
	}

	async getProductsByCollectionSlug({
		page,
		collectionSlug,
	}: {
		page: number
		collectionSlug: string
	}): Promise<Pagination<ProductFragment>> {
		const skip = (page - 1) * DEFAULT_PAGE_SIZE

		const res = await executeGraphql(ProductsListGetByCollectionSlugDocument, {
			first: DEFAULT_PAGE_SIZE,
			skip,
			collectionSlug,
		})

		if (!res.products) {
			return Promise.resolve({ data: [], meta: { page, pageCount: 0, pageSize: 0, total: 0 } })
		}

		return {
			meta: mapGraphqlPaginationToPagination({ page, paginationMeta: res.productsConnection }),
			data: res.products,
		}
	}

	async getRelatedProducts({
		categorySlug,
		collectionSlug,
	}: {
		page: number
		categorySlug: string
		collectionSlug: string
	}): Promise<ProductFragment[]> {
		const res = await executeGraphql(ProductsListRelatedGetDocument, {
			categorySlug,
			collectionSlug,
		})

		if (!res.products) {
			return []
		}

		return res.products
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
