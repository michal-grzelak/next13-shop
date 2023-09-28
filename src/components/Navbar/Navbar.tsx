import clsx from "clsx"
import { ShoppingCart } from "lucide-react"
import { type Route } from "next"

import { Searchbox } from "@components/Searchbox"
import { ActiveLink } from "@ui/ActiveLink"

export type NavbarRoute = { href: string; content: string; exact?: boolean }
type Props = {
	routes: NavbarRoute[]
}

export const Navbar = ({ routes }: Props) => {
	return (
		<nav>
			<ul className="flex px-3 py-2">
				{routes.map((route, index) => (
					<li key={`navigation-item-${index}`} className={clsx({ "ml-5": index > 0 })}>
						<ActiveLink href={route.href as Route} exact={route.exact}>
							{route.content}
						</ActiveLink>
					</li>
				))}

				<li className="ml-4">
					<Searchbox url="/search" />
				</li>

				<li className="ml-4">
					<ActiveLink href="/cart" exact>
						<ShoppingCart />
					</ActiveLink>
				</li>
			</ul>
		</nav>
	)
}
