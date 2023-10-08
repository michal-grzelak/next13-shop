import { type ReviewFragment } from "@gql/graphql"

import { ReviewItem } from "./ReviewItem"

type Props = {
	reviews: ReviewFragment[]
}

export const ReviewList = ({ reviews }: Props) => {
	return (
		<ul className="mt-8 grid grid-flow-row gap-y-2">
			{reviews.map((review) => (
				<ReviewItem key={`review-${review.id}`} review={review} />
			))}
		</ul>
	)
}
