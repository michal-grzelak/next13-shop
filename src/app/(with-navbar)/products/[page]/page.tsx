import { ProductList } from "@components/Product";
import { ProductService } from "@services";

type Props = {
	params: { page: string };
};

export default async function Products({ params: { page } }: Props) {
	const productService = new ProductService();
	const pageNumber = +page;
	const products = await productService.getProducts({ page: isNaN(pageNumber) ? 1 : pageNumber });

	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
		</section>
	);
}
