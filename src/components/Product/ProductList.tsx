import { type ProductFragment } from "@gql/graphql"

import { ProductItem } from "./ProductItem"
import { SortByPrice } from "./SortByPrice"

type Props = {
	products: ProductFragment[]
	canBeSorted?: boolean
}

export const ProductList = ({ products, canBeSorted = true }: Props) => {
	return (
		<div className="grid grid-flow-row gap-y-8">
			{canBeSorted && (
				<div>
					<SortByPrice />
				</div>
			)}

			<ul
				className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
				data-testid="products-list"
			>
				{products.map((product) => (
					<ProductItem key={product.id} product={product}></ProductItem>
				))}
			</ul>
		</div>
	)
}
