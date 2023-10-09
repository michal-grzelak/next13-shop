"use client"
import { experimental_useOptimistic as useOptimistic } from "react"

import { type ReviewFragment } from "@gql/graphql"
import { addReview } from "@serverActions"

import { ReviewForm } from "./ReviewForm"
import { ReviewList } from "./ReviewList"
import { type TReviewFormSubmitValue } from "./types"

type Props = {
	productId: string
	reviews: ReviewFragment[]
}

export const ProductReview = ({ productId, reviews }: Props) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		reviews,
		(_state, newReview: ReviewFragment) => [..._state, newReview],
	)

	const handleAddReview = async (value: TReviewFormSubmitValue) => {
		setOptimisticQuantity({ ...value, id: "" })
		const result = await addReview(productId, value)

		if (result && "errors" in result) {
			return result
		}
	}

	return (
		<div>
			<ReviewForm onSubmit={handleAddReview} />
			<ReviewList reviews={optimisticQuantity} />
		</div>
	)
}
