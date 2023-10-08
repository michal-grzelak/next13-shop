import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductImage, ProductList, ProductPrice } from "@components/Product"
import { VariantList } from "@components/Product/VariantList"
import { ProductReview } from "@components/Review"
import { ProductProvider } from "@providers/ProductProvider"
import { CartService, ProductService } from "@services"
import { FormButton } from "@ui/Button"

type Props = {
	params: { productId: string }
}

export async function generateMetadata({ params: { productId } }: Props): Promise<Metadata> {
	const productService = new ProductService()
	const product = await productService.getProduct({ id: productId })

	if (!product) {
		return { title: "Product not found" }
	}

	const title = `${product.name} product`

	return {
		title,
		description: product.description,
	}
}

export default async function ProductPage({ params: { productId } }: Props) {
	const productService = new ProductService()
	const product = await productService.getProduct({ id: productId })
	const relatedProducts = await productService.getRelatedProducts({
		categorySlug: product?.categories?.[0]?.slug ?? "",
	})

	if (!product) {
		return notFound()
	}

	const addToCart = async () => {
		"use server"
		const cartService = new CartService()

		const cart = await cartService.getOrCreateCart()
		await cartService.addProductHelper(cart, product)
	}

	return (
		<ProductProvider>
			<article className="container mx-auto flex flex-col gap-24 px-6">
				<div className="md:flex md:items-center">
					<ProductImage product={product} />

					<div className="mx-auto mt-5 w-full max-w-lg md:ml-8 md:mt-0 md:w-1/2">
						<h1 className="text-lg uppercase text-gray-700">{product.name}</h1>
						<ProductPrice price={product.price} />
						<hr className="my-3" />

						<section className="mt-2">
							<p>{product.description}</p>
						</section>

						<section className="mt-2">
							<VariantList variants={product.variants} />
						</section>

						<section className="mt-2">
							<form action={addToCart}>
								<FormButton data-testid="add-to-cart-button">Add to Cart</FormButton>
							</form>
						</section>
					</div>
				</div>

				<section>
					<ProductReview productId={productId} reviews={product.reviews ?? []} />
				</section>

				<section data-testid="related-products">
					<h2 className="text-lg uppercase text-gray-700">Related products</h2>
					<ProductList products={relatedProducts} />
				</section>
			</article>
		</ProductProvider>
	)
}
