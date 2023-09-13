import { type ReactNode } from "react";
import { ActiveLink } from "@ui/ActiveLink";

export default function NavLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<nav>
				<ul>
					<li>
						<ActiveLink href={"/"}>Home</ActiveLink>
					</li>
					<li>
						<ActiveLink href={"/products"}>All</ActiveLink>
					</li>
				</ul>
			</nav>
			<main>{children}</main>
		</>
	);
}
