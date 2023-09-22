import Link from "next/link"

import { type CategoryFragment } from "@gql/graphql"

type Props = {
	category: CategoryFragment
}

export const CategoryItem = ({ category }: Props) => {
	return (
		<li className="list-item">
			<Link href={`/categories/${category.slug}`}>{category.name}</Link>
		</li>
	)
}
