import Link from "next/link";
import { type Product } from "@types";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";

type Props = {
	product: Product;
};

export const ProductItem = ({ product }: Props) => {
	return (
		<li key={product.id}>
			<Link href={`/product/${product.id}`}>
				<article className="group">
					<ProductImage src={product.image} alt={product.title} />
					<h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
					<ProductPrice price={product.price} />
				</article>
			</Link>
		</li>
	);
};
