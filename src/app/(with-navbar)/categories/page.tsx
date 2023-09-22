import { CategoryList } from "@components/Category"
import { CategoryService } from "@services/CategoryService"

export default async function Categories() {
	const categoryService = new CategoryService()

	const categories = await categoryService.getCategories()

	return (
		<section className="p-4">
			<CategoryList categories={categories} />
		</section>
	)
}
