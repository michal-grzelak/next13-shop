"use client";

import { PaginationButton } from "./PaginationButton";
import { usePagination } from "./usePagination";

type Props = { page: number; pages: number; ariaLabel?: string };

export const Pagination = ({ page, pages, ariaLabel = "pagination-list" }: Props) => {
	const { pagination } = usePagination({ page, pages });

	return (
		<nav aria-label={ariaLabel}>
			<ul className="list-style-none flex">
				{pagination.map((pageItem, index) => (
					<li key={`pagination-tem-${index}`}>
						<PaginationButton
							href={pageItem.disabled ? "#" : `/products/${pageItem.page}`}
							disabled={pageItem.disabled}
							selected={page === pageItem.page}
						>
							{pageItem.children}
						</PaginationButton>
					</li>
				))}
			</ul>
		</nav>
	);
};
