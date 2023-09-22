import { type ReactNode } from "react"

import { Navbar, type NavbarRoute } from "@components/Navbar"

const routes: NavbarRoute[] = [
	{ href: "/", content: "Home" },
	{ href: "/products", content: "All", exact: false },
	{ href: "/categories", content: "Categories", exact: false },
	{ href: "/collections", content: "Collections", exact: false },
]

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar routes={routes} />

			<main>{children}</main>
		</>
	)
}
