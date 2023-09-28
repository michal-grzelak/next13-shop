"use client"

import clsx from "clsx"
import { useContext } from "react"

import { type ProductDetailsFragment } from "@gql/graphql"
import { ProductContext } from "@providers/ProductProvider"

type Props = {
	variant: ArrayElement<ProductDetailsFragment["variants"]>
}

export const Variant = ({ variant }: Props) => {
	const { selectedVariant, onSelectVariant } = useContext(ProductContext)
	const isSelected = selectedVariant === variant.id

	const handleOnClick = () => onSelectVariant({ id: variant.id })

	return (
		<li
			onClick={handleOnClick}
			className={clsx("block rounded px-3 py-1.5 text-sm  transition-all duration-300", {
				"cursor-pointer bg-neutral-100 text-black hover:bg-neutral-300": !isSelected,
				"bg-neutral-600 text-white outline outline-1 outline-gray-700 ": isSelected,
			})}
		>
			{variant.name}
		</li>
	)
}
