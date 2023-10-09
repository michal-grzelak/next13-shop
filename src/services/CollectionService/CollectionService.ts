import { type CollectionFragment, CollectionListGetDocument } from "@gql/graphql"
import { executeGraphql } from "@services/graphql"

export class CollectionService {
	async getCollections(): Promise<CollectionFragment[]> {
		const res = await executeGraphql(CollectionListGetDocument, {})

		if (!res.collections) {
			return []
		}

		return res.collections
	}
}
