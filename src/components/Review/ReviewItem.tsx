import { type ReviewFragment } from "@gql/graphql"

type Props = {
	review: ReviewFragment
}

export const ReviewItem = ({ review }: Props) => {
	return (
		<li className="grid grid-flow-col grid-cols-4">
			<div className="col-span-1">{review.rating}/5</div>
			<div className="col-span-3 grid grid-flow-row gap-y-1">
				<h2 className="font-bold">
					{review.name} ({review.email})
				</h2>
				<h3 className="font-semibold">{review.headline}</h3>
				<p>{review.content}</p>
			</div>
		</li>
	)
}
