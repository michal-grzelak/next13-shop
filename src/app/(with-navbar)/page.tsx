import { ProductList } from "@components/Product"
import { ProductService } from "@services"
import { PageHeading } from "@ui/Heading"

export default async function Home() {
	const productService = new ProductService()

	const { data: products } = await productService.getProducts({
		page: 1,
	})

	return (
		<>
			<PageHeading>Check the new products!</PageHeading>

			<ProductList products={products} canBeSorted={false}></ProductList>
		</>
	)
}
