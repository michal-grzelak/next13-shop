import { CategoryOrCollectionList } from "@components/CategoryOrCollection"
import { CategoryService } from "@services/CategoryService"
import { PageHeading } from "@ui/Heading"

export default async function Categories() {
	const categoryService = new CategoryService()
	const categories = await categoryService.getCategories()

	return (
		<>
			<PageHeading>Categories</PageHeading>

			<CategoryOrCollectionList items={categories} urlPrefix="categories" />
		</>
	)
}
