import { ProductList } from "@components/Product";
import { ProductService } from "@services";

export default async function Products() {
	const productService = new ProductService();
	const products = await productService.getProducts({ page: 1 });

	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
		</section>
	);
}
