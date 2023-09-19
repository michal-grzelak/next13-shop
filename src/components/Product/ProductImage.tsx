import Image from "next/image"

type Props = {
	src: string
	alt: string
}

export const ProductImage = ({ src, alt }: Props) => {
	return (
		<div className="w-fit overflow-hidden rounded-lg bg-gray-200 p-0">
			<Image
				src={src}
				alt={alt}
				width={320}
				height={320}
				className="aspect-square object-cover object-center group-hover:opacity-75"
			/>
		</div>
	)
}
