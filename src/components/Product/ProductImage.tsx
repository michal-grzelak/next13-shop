import Image from "next/image"
import { type Product } from "@types"

type Props = {
	product: Product
}

export const ProductImage = ({ product }: Props) => {
	return (
		<div className="w-fit overflow-hidden rounded-lg bg-gray-200 p-0">
			<Image
				src={product.image}
				alt={product.title}
				width={320}
				height={320}
				className="aspect-square object-cover object-center group-hover:opacity-75"
			/>
		</div>
	)
}
