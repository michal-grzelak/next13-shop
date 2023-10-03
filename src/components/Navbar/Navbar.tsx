import clsx from "clsx"
import { ShoppingCart } from "lucide-react"
import { type Route } from "next"
import { cookies } from "next/headers"

import { Searchbox } from "@components/Searchbox"
import { CartService } from "@services"
import { ActiveLink } from "@ui/ActiveLink"

export type NavbarRoute = { href: string; content: string; exact?: boolean }
type Props = {
	routes: NavbarRoute[]
}

export async function Navbar({ routes }: Props) {
	const cartId = cookies().get("cartId")?.value

	const cartService = new CartService()
	const cart = await cartService.getCart({ id: cartId ?? "" })

	return (
		<nav>
			<ul className="flex items-center px-3 py-2">
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
						{cart?.orderItems?.length ?? 0}
					</ActiveLink>
				</li>
			</ul>
		</nav>
	)
}
