import { Pagination } from "@components/Pagination"
import { ProductList } from "@components/Product"
import { type ProductOrderByInput } from "@gql/graphql"
import { ProductService } from "@services"

type Props = {
	params: { page: string }
	searchParams: { sort: ProductOrderByInput }
}

export async function generateStaticParams() {
	const array = [...Array(1).keys()]

	return array.map((_, index) => ({
		page: String(index + 1),
	}))
}

export default async function Products({ params: { page }, searchParams: { sort } }: Props) {
	const productService = new ProductService()
	const pageNumber = +page
	const { data: products, meta } = await productService.getProducts({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		orderBy: sort,
	})

	return (
		<>
			<ProductList products={products}></ProductList>
			<Pagination page={pageNumber} pages={meta.pageCount} />
		</>
	)
}
