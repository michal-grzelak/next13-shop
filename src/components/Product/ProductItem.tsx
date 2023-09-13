import Image from "next/image";
import Link from "next/link";
import { type Product } from "@types";

type Props = {
	product: Product;
};

export const ProductItem = ({ product }: Props) => {
	return (
		<li key={product.id}>
			<Link href={`/product/${product.id}`}>
				<article className="group">
					<div className="w-fit overflow-hidden rounded-lg bg-gray-200 p-0">
						<Image
							src={product.image}
							alt={product.title}
							width={320}
							height={320}
							className="aspect-square object-cover object-center group-hover:opacity-75"
						/>
					</div>
					<h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
					<p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
				</article>
			</Link>
		</li>
	);
};
