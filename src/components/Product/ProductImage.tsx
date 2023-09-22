import Image from "next/image"

import { type ProductFragment } from "@gql/graphql"

type Props = {
	product: ProductFragment
}

export const ProductImage = ({ product }: Props) => {
	return (
		<div className="w-fit overflow-hidden rounded-lg bg-gray-200 p-0">
			<Image
				src={product.images[0]?.url ?? ""}
				alt={product.name}
				width={320}
				height={320}
				className="aspect-square object-cover object-center group-hover:opacity-75"
			/>
		</div>
	)
}
