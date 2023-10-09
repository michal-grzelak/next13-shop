"use client"

import { ArrowDown01, ArrowUp01 } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { ProductOrderByInput } from "@gql/graphql"
import { Button } from "@ui/Button"
import { useSearchParamsManager } from "@utils/useSearchParamsManager"

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

	return (
		<Button
			onClick={onClick}
			variant={isPriceSort ? "default" : "secondary"}
			data-testid="sort-by-price"
		>
			Sort by price {sortValue === ProductOrderByInput.PriceDesc ? <ArrowUp01 /> : <ArrowDown01 />}
		</Button>
	)
}
