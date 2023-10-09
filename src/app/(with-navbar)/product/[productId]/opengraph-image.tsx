import { ImageResponse } from "next/server"

import { ProductService } from "@services"

export const runtime = "edge"
export const contentType = "image/png"
export const size = {
	width: 1200,
	height: 630,
}

export default async function OpenGraphImage({
	params: { productId },
}: {
	params: { productId: string }
}) {
	const productService = new ProductService()
	const product = await productService.getProduct({ id: productId })

	if (!product) {
		return null
	}

	return new ImageResponse(
		(
			<div tw="flex flex-col">
				{product.images[0].url && <img src={product.images[0].url} width={320} height={320} />}
				<p>{product.name}</p>
				<p>{JSON.stringify(product.categories.map((category) => category.name))}</p>
				<p>{product.description}</p>
			</div>
		),
	)
}
