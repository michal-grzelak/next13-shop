import { CategoryOrCollectionList } from "@components/CategoryOrCollection"
import { CollectionService } from "@services/CollectionService"
import { PageHeading } from "@ui/Heading"

export default async function Collections() {
	const collectionService = new CollectionService()

	const collections = await collectionService.getCollections()

	return (
		<>
			<PageHeading>Collections</PageHeading>

			<CategoryOrCollectionList items={collections} urlPrefix="collections" />
		</>
	)
}
