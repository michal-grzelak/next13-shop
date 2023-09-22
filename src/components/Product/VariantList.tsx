import { type ProductDetailsFragment } from "@gql/graphql"

import { Variant } from "./Variant"

type Props = {
	variants: ProductDetailsFragment["variants"]
}

export const VariantList = ({ variants }: Props) => {
	return (
		<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{variants.map((variant) => (
				<Variant key={`variant-${variant.id}`} variant={variant} />
			))}
		</ul>
	)
}
