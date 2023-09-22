import clsx from "clsx"
import { type Route } from "next"
import { type ReactNode } from "react"

import { ActiveLink } from "@ui/ActiveLink"

const routes = [
	{ href: "/", content: "Home" },
	{ href: "/products", content: "All", exact: false },
	{ href: "/categories", content: "Categories", exact: false },
]

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<nav>
				<ul className="flex px-3 py-2">
					{routes.map((route, index) => (
						<li key={`navigation-item-${index}`} className={clsx({ "ml-5": index > 0 })}>
							<ActiveLink href={route.href as Route} exact={route.exact}>
								{route.content}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>

			<main>{children}</main>
		</>
	)
}
