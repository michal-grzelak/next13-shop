import { type Route } from "next"
import Link from "next/link"
import { type ReactNode } from "react"

import { Button } from "@ui/Button"

type Props<T extends string> = {
	children: ReactNode
	href: Route<T>
	disabled?: boolean
	selected?: boolean
}

export const PaginationButton = <T extends string>({
	children,
	href,
	disabled,
	selected,
}: Props<T>) => {
	if (disabled) {
		return (
			<Button variant={selected ? "default" : "ghost"} size={"sm"} disabled>
				{children}
			</Button>
		)
	}

	return (
		<Button asChild variant={"ghost"} size={"sm"}>
			<Link href={href}>{children}</Link>
		</Button>
	)
}
