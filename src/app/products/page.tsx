import Image from "next/image";

const products = [
	{
		id: 1,
		name: "Camera",
		href: "#",
		price: "$480",
		imageSrc: "/product_1.jpg",
		imageAlt: "Black fujifilm camera",
	},
	{
		id: 2,
		name: "SD Card",
		href: "#",
		price: "$35",
		imageSrc: "/product_2.jpg",
		imageAlt: "Lexar 128GB sd card",
	},
	{
		id: 3,
		name: "Pancakes",
		href: "#",
		price: "$9",
		imageSrc: "/product_3.jpg",
		imageAlt: "Pancakes with fruits and maple syrup",
	},
	{
		id: 4,
		name: "Watch",
		href: "#",
		price: "$200",
		imageSrc: "/product_4.jpg",
		imageAlt: "A Hublot watch with black strip",
	},
];

export default function Products() {
	return (
		<section className="p-4">
			<ul
				className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
				data-testid="products-list"
			>
				{products.map((product) => (
					<li key={product.id}>
						<a className="group" href={product.href}>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
								<Image
									src={product.imageSrc}
									alt={product.imageAlt}
									width={320}
									height={320}
									className="h-full w-full object-cover object-center group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
							<p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
