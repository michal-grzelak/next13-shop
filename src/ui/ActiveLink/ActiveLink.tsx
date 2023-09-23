"use client"

import clsx from "clsx"
import { type Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

type Props<T extends string> = {
	href: Route<T>
	children: ReactNode
	exact?: boolean
}

export const ActiveLink = <T extends string>({ href, children, exact = true }: Props<T>) => {
	const pathname = usePathname()
	const isActive = exact ? href === pathname : pathname.startsWith(href)

	return (
		<Link
			href={href}
			className={clsx("text-blue-500 hover:font-bold", {
				"border-b-2 border-current text-blue-950": isActive,
			})}
			aria-current={isActive ? true : undefined}
		>
			{children}
		</Link>
	)
}
