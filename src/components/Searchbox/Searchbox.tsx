"use client"

import { type Route } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import { type ChangeEventHandler } from "react"

import { Input } from "@ui/Input"
import { debounce } from "@utils/debounce"

type Props = {
	url: Route
}

export const Searchbox = ({ url }: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const query = searchParams.get("query") ?? ""

	const search = ({ value }: { value: string }) => {
		router.push(`${url}?query=${value}`)
	}
	const debouncedSearch = debounce(search, 500)

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		debouncedSearch({ value: event.target.value })
	}

	return <Input defaultValue={query} onChange={handleOnChange} role="searchbox" />
}
