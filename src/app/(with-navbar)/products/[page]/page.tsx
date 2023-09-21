import { Pagination } from "@components/Pagination"
import { ProductList } from "@components/Product"
import { ProductService } from "@services"

type Props = {
	params: { page: string }
}

export async function generateStaticParams() {
	const array = [...Array(10).keys()]

	return array.map((_, index) => ({
		page: String(index + 1),
	}))
}

export default async function Products({ params: { page } }: Props) {
	const productService = new ProductService()
	const pageNumber = +page
	const { data: products, meta } = await productService.getProducts({
		page: isNaN(pageNumber) ? 1 : pageNumber,
	})

	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
			<Pagination page={pageNumber} pages={meta.pageCount} />
		</section>
	)
}
