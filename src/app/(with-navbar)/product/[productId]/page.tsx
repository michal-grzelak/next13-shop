import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { ProductImage, ProductPrice } from "@components/Product";
import { ProductService } from "@services";

type Props = {
	params: { productId: string };
};

export async function generateMetadata({ params: { productId } }: Props): Promise<Metadata> {
	const productService = new ProductService();
	const product = await productService.getProduct({ id: productId });

	if (!product) {
		return { title: "Product not found" };
	}

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			title: product.title,
			description: product.description,
			images: [product.image],
		},
	};
}

export default async function ProductPage({ params: { productId } }: Props) {
	const productService = new ProductService();
	const product = await productService.getProduct({ id: productId });

	if (!product) {
		return notFound();
	}

	return (
		<article className="container mx-auto px-6">
			<div className="md:flex md:items-center">
				<ProductImage src={product.image} alt={product.title} />

				<div className="mx-auto mt-5 w-full max-w-lg md:ml-8 md:mt-0 md:w-1/2">
					<h3 className="text-lg uppercase text-gray-700">{product.title}</h3>
					<ProductPrice price={product.price} />
					<hr className="my-3" />
					<section className="mt-2">
						<p>{product.description}</p>
					</section>
				</div>
			</div>
		</article>
	);
}
