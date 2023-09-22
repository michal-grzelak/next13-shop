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
			className={clsx(
				"block rounded  bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 ",
				{
					"bg-neutral-100 text-black hover:bg-neutral-300": !isSelected,
					"bg-neutral-500 text-white": isSelected,
				},
			)}
		>
			{variant.name}
		</li>
	)
}
