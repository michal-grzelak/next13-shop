"use client"

import { ArrowDown01, ArrowUp01 } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { ProductOrderByInput } from "@gql/graphql"
import { Button } from "@ui/Button"
import { useSearchParamsManager } from "@utils/useSearchParamsManager"

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

	return (
		<Button
			onClick={onClick}
			variant={isRatingSort ? "default" : "secondary"}
			data-testid="sort-by-rating"
		>
			Sort by rating{" "}
			{sortValue === ProductOrderByInput.RatingDesc ? <ArrowUp01 /> : <ArrowDown01 />}
		</Button>
	)
}
