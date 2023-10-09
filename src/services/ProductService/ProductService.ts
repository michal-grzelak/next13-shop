import { revalidateTag } from "next/cache"

import {
	type ProductFragment,
	ProductGetDocument,
	type ProductPaginationFragment,
	ProductsListGetDocument,
	ProductsListGetByCategorySlugDocument,
	ProductsListGetByCollectionSlugDocument,
	ProductsListRelatedGetDocument,
	type ProductDetailsFragment,
	ProductsListGetSearchDocument,
	type ReviewAddMutationVariables,
	type ReviewFragment,
	ReviewAddDocument,
	type ProductOrderByInput,
} from "@gql/graphql"
import { DEFAULT_PAGE_SIZE, EFetchTag } from "@services/constants"
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
	async getProducts({
		page,
		orderBy,
	}: {
		page: number
		orderBy?: ProductOrderByInput
	}): Promise<Pagination<ProductFragment>> {
		const skip = (page - 1) * DEFAULT_PAGE_SIZE

		const res = await executeGraphql(
			ProductsListGetDocument,
			{
				first: DEFAULT_PAGE_SIZE,
				skip,
				orderBy,
			},
			{ next: { tags: [EFetchTag.PRODUCTS] } },
		)

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

		const res = await executeGraphql(
			ProductsListGetByCategorySlugDocument,
			{
				first: DEFAULT_PAGE_SIZE,
				skip,
				categorySlug,
			},
			{ next: { tags: [EFetchTag.PRODUCTS] } },
		)

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

		const res = await executeGraphql(
			ProductsListGetByCollectionSlugDocument,
			{
				first: DEFAULT_PAGE_SIZE,
				skip,
				collectionSlug,
			},
			{ next: { tags: [EFetchTag.PRODUCTS] } },
		)

		if (!res.products) {
			return Promise.resolve({ data: [], meta: { page, pageCount: 0, pageSize: 0, total: 0 } })
		}

		return {
			meta: mapGraphqlPaginationToPagination({ page, paginationMeta: res.productsConnection }),
			data: res.products,
		}
	}

	async getProductsByName({ search }: { search: string }): Promise<ProductFragment[]> {
		const res = await executeGraphql(
			ProductsListGetSearchDocument,
			{
				search,
			},
			{ next: { tags: [EFetchTag.PRODUCTS] } },
		)

		if (!res.products) {
			return []
		}

		return res.products
	}

	async getRelatedProducts({ categorySlug }: { categorySlug: string }): Promise<ProductFragment[]> {
		const res = await executeGraphql(
			ProductsListRelatedGetDocument,
			{
				categorySlug,
			},
			{ next: { tags: [EFetchTag.PRODUCTS] } },
		)

		if (!res.products) {
			return []
		}

		return res.products
	}

	async getProduct({ id }: { id: string }): Promise<ProductDetailsFragment | null> {
		const res = await executeGraphql(
			ProductGetDocument,
			{
				productId: id,
			},
			{ next: { tags: [EFetchTag.PRODUCTS] } },
		)

		if (!res.product) {
			return null
		}

		return res.product
	}

	async addReview({
		productId,
		headline,
		content,
		rating,
		name,
		email,
	}: ReviewAddMutationVariables): Promise<ReviewFragment> {
		const res = await executeGraphql(
			ReviewAddDocument,
			{
				productId,
				headline,
				content,
				rating,
				name,
				email,
			},
			{ cache: "no-store" },
		)

		if (!res.createReview) {
			throw Error("Failed to add review!")
		}

		revalidateTag(EFetchTag.PRODUCTS)

		return res.createReview
	}
}
