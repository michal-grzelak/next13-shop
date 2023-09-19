import { type Product } from "@types"
import { ProductItem } from "./ProductItem"

type Props = {
	products: Product[]
}

export const ProductList = ({ products }: Props) => {
	return (
		<ul
			className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
			data-testid="products-list"
		>
			{products.map((product) => (
				<ProductItem key={product.id} product={product}></ProductItem>
			))}
		</ul>
	)
}
