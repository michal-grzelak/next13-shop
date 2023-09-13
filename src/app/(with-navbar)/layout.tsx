import { type ReactNode } from "react";
import { type Route } from "next";
import clsx from "clsx";
import { ActiveLink } from "@ui/ActiveLink";

const routes = [
	{ href: "/", content: "Home" },
	{ href: "/products", content: "All" },
];

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<nav>
				<ul className="flex px-3 py-2">
					{routes.map((route, index) => (
						<li key={`navigation-item-${index}`} className={clsx({ "ml-5": index > 0 })}>
							<ActiveLink href={route.href as Route}>{route.content}</ActiveLink>
						</li>
					))}
				</ul>
			</nav>

			<main>{children}</main>
		</>
	);
}