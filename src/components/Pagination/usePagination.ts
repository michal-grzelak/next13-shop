/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ReactNode } from "react"

const DISPLAY_COUNT = 1

type Page = {
	children: ReactNode
	disabled?: boolean
	page?: number
}

export const usePagination = ({
	page,
	pages,
	displayCount = DISPLAY_COUNT,
}: {
	page: number
	pages: number
	displayCount?: number
}) => {
	const isPrevious = page > 1
	const isNext = page < pages

	const beforeCurrentPages = page - 1
	const afterCurrentPages = pages - page

	const showBeforeCount = Math.min(displayCount, beforeCurrentPages)
	const showAfterCount = Math.min(displayCount, afterCurrentPages)

	const showBeforeDots = beforeCurrentPages - 1 > displayCount
	const showAfterDots = afterCurrentPages - 1 > displayCount

	const firstDisplayedPage = Math.max(page - displayCount, 2)
	const lastDisplayedPage = Math.min(page + displayCount, pages - 1)
	const displayedPages = lastDisplayedPage - firstDisplayedPage + 1

	return {
		pagination: [
			{ children: "Previous", page: page - 1, disabled: !isPrevious },
			{ children: 1, page: 1, disabled: page === 1 },
			...(showBeforeDots ? [{ children: "...", disabled: true }] : []),
			...[...Array(displayedPages).keys()].map((_, index) => ({
				children: index + firstDisplayedPage,
				page: index + firstDisplayedPage,
				disabled: index + firstDisplayedPage === page,
			})),
			...(showAfterDots ? [{ children: "...", disabled: true }] : []),
			{ children: pages, page: pages, disabled: pages === page },
			{ children: "Next", page: page + 1, disabled: !isNext },
		] as Page[],
	}
}
