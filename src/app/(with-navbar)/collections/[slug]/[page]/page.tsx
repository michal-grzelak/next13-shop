import { Pagination } from "@components/Pagination"
import { ProductList } from "@components/Product"
import { ProductService } from "@services"

type Props = {
	params: { slug: string; page: string }
}

export default async function ProductsByCollection({ params: { page, slug } }: Props) {
	const productService = new ProductService()
	const pageNumber = +page
	const { data: products, meta } = await productService.getProductsByCollectionSlug({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		collectionSlug: slug,
	})

	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
			<Pagination page={pageNumber} pages={meta.pageCount} />
		</section>
	)
}
