"use client";

import { type Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const ActiveLink = <T extends string>({
	href,
	children,
}: {
	href: Route<T> | URL;
	children: ReactNode;
}) => {
	const pathname = usePathname();
	const isActive = href === pathname;

	return (
		<Link
			href={href}
			className={clsx("text-blue-500 hover:font-bold", {
				"text-blue-950 underline": isActive,
			})}
		>
			{children}
		</Link>
	);
};
