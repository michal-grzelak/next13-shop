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
	return (
		<Link
			className={clsx(
				"relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white",
				{ "pointer-events-none": disabled },
				{ "text-gray-400": disabled && !selected },
				{ underline: selected },
			)}
			href={href}
		>
			{children}
		</Link>
	);
};
