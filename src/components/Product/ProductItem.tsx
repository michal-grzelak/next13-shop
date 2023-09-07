import Image from "next/image";
import { type IUIProduct } from "./types";

type Props = {
	product: IUIProduct;
};

export const ProductItem = ({ product }: Props) => {
	return (
		<li key={product.id}>
			<article className="group">
				<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
					<Image
						src={product.image.src}
						alt={product.image.alt}
						width={320}
						height={320}
						className="h-full w-full object-cover object-center group-hover:opacity-75"
					/>
				</div>
				<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
				<p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
			</article>
		</li>
	);
};
