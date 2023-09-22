import { type ProductCategoryFragment } from "@/gql/graphql"

export interface Product {
	id: string
	title: string
	price: number
	description: string
	categories: ProductCategoryFragment[]
	image: string
}
