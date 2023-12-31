import Link from "next/link"

import { type ProductFragment } from "@gql/graphql"

import { ProductImage } from "./ProductImage"
import { ProductPrice } from "./ProductPrice"

type Props = {
	product: ProductFragment
}

export const ProductItem = ({ product }: Props) => {
	return (
		<li key={product.id}>
			<Link href={`/product/${product.id}`}>
				<article className="group">
					<ProductImage product={product} />
					<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
					<div className="flex flex-row items-center justify-between">
						<ProductPrice price={product.price} />
						<span data-testid="product-rating">
							{product.rating ? <>{product.rating.toFixed(2)}/5</> : <>0?</>}
						</span>
					</div>
				</article>
			</Link>
		</li>
	)
}
