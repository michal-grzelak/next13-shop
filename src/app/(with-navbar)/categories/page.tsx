import { CategoryService } from "@services/CategoryService"

export default async function Categories() {
	const categoryService = new CategoryService()

	const categories = await categoryService.getCategories()

	return <section className="p-4">{JSON.stringify(categories)}</section>
}
