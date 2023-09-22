"use client"

import { type Route } from "next"
import { useRouter, useSearchParams } from "next/navigation"
import { type ChangeEventHandler } from "react"

type Props = {
	url: Route
}

const useDebounce = <TArgs,>(callback: (args: TArgs) => void, timeout: number) => {
	let timer: NodeJS.Timeout

	return (args: TArgs) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			callback(args)
		}, timeout)
	}
}

export const Searchbox = ({ url }: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const query = searchParams.get("query") ?? ""

	const search = ({ value }: { value: string }) => {
		router.push(`${url}?query=${value}`)
	}
	const debouncedSearch = useDebounce(search, 500)

	const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		debouncedSearch({ value: event.target.value })
	}

	return (
		<input
			defaultValue={query}
			onChange={handleOnChange}
			role="searchbox"
			className="rounded px-3 outline outline-1 outline-slate-500 focus:outline-2 focus:outline-slate-900"
		/>
	)
}
