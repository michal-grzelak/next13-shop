/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { ArrowDown01, ArrowUp01 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { type ChangeEventHandler } from "react"

import { ProductOrderByInput } from "@gql/graphql"
import { Button } from "@ui/Button"
import { type SelectItem } from "@ui/Select"
import { useSearchParamsManager } from "@utils/useSearchParamsManager"

const items: SelectItem[] = [
	{ label: "Ascending", value: ProductOrderByInput.PriceAsc },
	{ label: "Descending", value: ProductOrderByInput.PriceDesc },
]

export const SortByPrice = () => {
	const searchParamsManager = useSearchParamsManager()
	const searchParams = useSearchParams()
	const sortValue = (searchParams.get("sort") as ProductOrderByInput) ?? undefined
	const isPriceSort =
		sortValue === ProductOrderByInput.PriceAsc || sortValue === ProductOrderByInput.PriceDesc
	const onClick = () => {
		let value: ProductOrderByInput | undefined
		switch (sortValue) {
			case ProductOrderByInput.PriceAsc:
				value = ProductOrderByInput.PriceDesc
				break
			case ProductOrderByInput.PriceDesc:
				value = undefined
				break
			case undefined:
			default:
				value = ProductOrderByInput.PriceAsc
				break
		}

		if (value) {
			searchParamsManager.set("sort", value)
		} else {
			searchParamsManager.remove("sort")
		}
	}

	const onChange: ChangeEventHandler<HTMLSelectElement> = (value) => {
		if (value.target.value) {
			searchParamsManager.set("sort", value.target.value)
		} else {
			searchParamsManager.remove("sort")
		}
	}

	return (
		// <Button
		// 	onClick={onClick}
		// 	variant={isPriceSort ? "default" : "secondary"}
		// 	data-testid="sort-by-price"
		// >
		// 	Sort by price {sortValue === ProductOrderByInput.PriceDesc ? <ArrowUp01 /> : <ArrowDown01 />}
		// </Button>

		<select
			id={"sort-by-price"}
			className="rounded-md border border-gray-200 p-2"
			value={sortValue}
			placeholder={"Sort by price"}
			onChange={onChange}
		>
			<option value="">Default</option>
			{items.map((option, key) => (
				<option
					key={`sort-by-price-option-${key}`}
					value={option.value}
					data-testid="sort-by-price"
				>
					{option.label}
				</option>
			))}
		</select>
	)
}
