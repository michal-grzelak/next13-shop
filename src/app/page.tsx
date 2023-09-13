import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<Link className="text-gray-900" href="/products">
				Products
			</Link>
		</div>
	);
}
