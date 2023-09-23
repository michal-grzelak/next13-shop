import { type CategoryFragment, CategoriesListGetDocument } from "@gql/graphql"
import { executeGraphql } from "@services/graphql"

export class CategoryService {
	async getCategories(): Promise<CategoryFragment[]> {
		const res = await executeGraphql(CategoriesListGetDocument, {})

		if (!res.categories) {
			return []
		}

		return res.categories
	}
}
