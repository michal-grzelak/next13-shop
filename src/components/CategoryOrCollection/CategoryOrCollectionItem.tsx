import Link from "next/link"

import { type CategoryFragment } from "@gql/graphql"

type Props = {
	item: CategoryFragment
	urlPrefix: "categories" | "collections"
}

export const CategoryOrCollectionItem = ({ item, urlPrefix }: Props) => {
	return (
		<li className="list-item">
			<Link href={`/${urlPrefix}/${item.slug}`}>{item.name}</Link>
		</li>
	)
}
