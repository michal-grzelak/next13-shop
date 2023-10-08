import { type Route } from "next"
import { useSearchParams as _useSearchParams, usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

export const useSearchParamsManager = () => {
	const searchParams = _useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	// Get a new searchParams string by merging the current
	// searchParams with a provided key/value pair
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)

			return params.toString()
		},
		[searchParams],
	)

	const set = (key: string, value: string) => {
		router.replace((pathname + "?" + createQueryString(key, value)) as Route)
	}

	return { set }
}
