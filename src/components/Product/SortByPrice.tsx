"use client"

import { useSearchParams } from "next/navigation"

import { Select, type SelectItem } from "@ui/Select"
import { useSearchParamsManager } from "@utils/useSearchParamsManager"

const items: SelectItem[] = [
	{ label: "Ascending", value: "asc" },
	{ label: "Descending", value: "desc" },
]

export const SortByPrice = () => {
	const searchParamsManager = useSearchParamsManager()
	const searchParams = useSearchParams()
	const sortValue = searchParams.get("sort")

	const onSelect = (value: string) => {
		searchParamsManager.set("sort", value)
	}

	return (
		<Select
			items={items}
			placeholder="Sort by price"
			onSelect={onSelect}
			value={sortValue ?? undefined}
			className="max-w-[180px]"
		/>
	)
}
