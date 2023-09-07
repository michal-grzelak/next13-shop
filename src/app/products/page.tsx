import { type IUIProduct, ProductList } from "@components/Product";

const products: IUIProduct[] = [
	{
		id: 1,
		name: "Camera",
		price: 480,
		image: { src: "/product_1.jpg", alt: "Black fujifilm camera" },
	},
	{
		id: 2,
		name: "SD Card",
		price: 35,
		image: { src: "/product_2.jpg", alt: "Lexar 128GB sd card" },
	},
	{
		id: 3,
		name: "Pancakes",
		price: 9,
		image: { src: "/product_3.jpg", alt: "Pancakes with fruits and maple syrup" },
	},
	{
		id: 4,
		name: "Watch",
		price: 200,
		image: { src: "/product_4.jpg", alt: "A Hublot watch with black strip" },
	},
];

export default function Products() {
	return (
		<section className="p-4">
			<ProductList products={products}></ProductList>
		</section>
	);
}
