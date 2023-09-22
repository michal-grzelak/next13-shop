import { Pagination } from "@components/Pagination"
import { ProductList } from "@components/Product"
import { ProductService } from "@services"

type Props = {
	params: { slug: string; page: string }
}

export default async function ProductsByCategory({ params: { page, slug } }: Props) {
	const productService = new ProductService()
	const pageNumber = +page
	const { data: products, meta } = await productService.getProductsByCategorySlug({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		categorySlug: slug,
	})

	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
			<Pagination page={pageNumber} pages={meta.pageCount} />
		</section>
	)
}
