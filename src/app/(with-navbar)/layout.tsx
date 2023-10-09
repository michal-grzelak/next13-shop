import { Suspense, type ReactNode } from "react"

import { Navbar, type NavbarRoute } from "@components/Navbar"

const routes: NavbarRoute[] = [
	{ href: "/", content: "Home" },
	{ href: "/products", content: "All", exact: false },
	{ href: "/collections", content: "Collections", exact: true },
	{ href: "/collections/summer-vibes", content: "SUMMER-VIBES", exact: false },
	{ href: "/categories", content: "Categories", exact: true },
	{ href: "/categories/accessories", content: "ACCESSORIES", exact: false },
]

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Suspense>
				<Navbar routes={routes} />
			</Suspense>

			<main className="container mt-4 flex flex-col gap-4">{children}</main>
		</>
	)
}
