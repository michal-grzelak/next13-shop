import { type Route } from "next"
import { useSearchParams as _useSearchParams, usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

export const useSearchParamsManager = () => {
	const searchParams = _useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const appendQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams],
	)

	const removeQueryString = useCallback(
		(name: string) => {
			const params = new URLSearchParams(searchParams)
			params.delete(name)

			return params.toString()
		},
		[searchParams],
	)

	const set = (key: string, value: string) => {
		router.replace((pathname + "?" + appendQueryString(key, value)) as Route, { scroll: false })
	}

	const remove = (key: string) => {
		router.replace((pathname + "?" + removeQueryString(key)) as Route, { scroll: false })
	}

	return { set, remove }
}
