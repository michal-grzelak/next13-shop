import { ProductList } from "@components/Product"
import { ProductService } from "@services"

type Props = {
	searchParams: { query: string }
}

export default async function Products({ searchParams: { query } }: Props) {
	const productService = new ProductService()
	const products = await productService.getProductsByName({
		search: query,
	})

	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
		</section>
	)
}
