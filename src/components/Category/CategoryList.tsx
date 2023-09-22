import { type CategoryFragment } from "@gql/graphql"

import { CategoryItem } from "./CategoryItem"

type Props = {
	categories: CategoryFragment[]
}

export const CategoryList = ({ categories }: Props) => {
	return (
		<ul className="list-disc">
			{categories.map((category, index) => (
				<CategoryItem key={`category-${index}`} category={category} />
			))}
		</ul>
	)
}
