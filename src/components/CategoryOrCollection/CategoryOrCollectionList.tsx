import { type CollectionFragment, type CategoryFragment } from "@gql/graphql"

import { CategoryOrCollectionItem } from "./CategoryOrCollectionItem"

type Props = {
	items: CategoryFragment[] | CollectionFragment[]
	urlPrefix: "categories" | "collections"
}

export const CategoryOrCollectionList = ({ items, urlPrefix }: Props) => {
	return (
		<ul className="list-disc">
			{items.map((item, index) => (
				<CategoryOrCollectionItem key={`${urlPrefix}-${index}`} item={item} urlPrefix={urlPrefix} />
			))}
		</ul>
	)
}
