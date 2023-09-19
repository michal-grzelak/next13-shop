import clsx from "clsx";
import { type Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

type Props<T extends string> = {
	children: ReactNode;
	href: Route<T>;
	disabled?: boolean;
	selected?: boolean;
};

export const PaginationButton = <T extends string>({
	children,
	href,
	disabled,
	selected,
}: Props<T>) => {
	const className = clsx(
		// all styles
		"relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white",
		// only active links (NOT disabled and NOT selected)
		{ "text-gray-700": !disabled && !selected },
		// only selected
		{ "text-gray-950 underline": selected },
		// all disabled
		{ "pointer-events-none": disabled },
		// all disabled WITHOUT selected
		{ "text-gray-400": disabled && !selected },
	);

	if (disabled) {
		return <div className={className}>{children}</div>;
	}

	return (
		<Link className={className} href={href}>
			{children}
		</Link>
	);
};
