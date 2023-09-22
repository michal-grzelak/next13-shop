import { CollectionService } from "@services/CollectionService"

export default async function Collections() {
	const collectionService = new CollectionService()

	const collections = await collectionService.getCollections()

	return <section className="p-4">{JSON.stringify(collections)}</section>
}
