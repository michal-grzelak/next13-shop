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
	{ label: "Ascending", value: ProductOrderByInput.RatingAsc },
	{ label: "Descending", value: ProductOrderByInput.RatingDesc },
]

export const SortByRating = () => {
	const searchParamsManager = useSearchParamsManager()
	const searchParams = useSearchParams()
	const sortValue = (searchParams.get("sort") as ProductOrderByInput) ?? undefined
	const isRatingSort =
		sortValue === ProductOrderByInput.RatingAsc || sortValue === ProductOrderByInput.RatingDesc

	const onClick = () => {
		let value: ProductOrderByInput | undefined
		switch (sortValue) {
			case ProductOrderByInput.RatingAsc:
				value = ProductOrderByInput.RatingDesc
				break
			case ProductOrderByInput.RatingDesc:
				value = undefined
				break
			case undefined:
			default:
				value = ProductOrderByInput.RatingAsc
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
		// 	variant={isRatingSort ? "default" : "secondary"}
		// 	data-testid="sort-by-rating"
		// >
		// 	Sort by rating{" "}
		// 	{sortValue === ProductOrderByInput.RatingDesc ? <ArrowUp01 /> : <ArrowDown01 />}
		// </Button>
		<select
			id={"sort-by-rating"}
			className="rounded-md border border-gray-200 p-2"
			value={sortValue}
			placeholder={"Sort by rating"}
			onChange={onChange}
		>
			<option value="">Default</option>
			{items.map((option, key) => (
				<option
					key={`sort-by-rating-option-${key}`}
					value={option.value}
					data-testid="sort-by-rating"
				>
					{option.label}
				</option>
			))}
		</select>
	)
}
