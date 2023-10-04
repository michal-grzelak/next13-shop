"use client"
import { addReview } from "@serverActions"
import { FormField, Form } from "@ui/Form"
import { Input } from "@ui/Input"

import { reviewFormSchema } from "./constants"
import { type TReviewFormSubmitValue } from "./types"

type Props = { productId: string }

export const ReviewForm = ({ productId }: Props) => {
	const onSubmit = async (value: TReviewFormSubmitValue) => {
		const result = await addReview(productId, value)

		if (result && "errors" in result) {
			return result
		}
	}
	return (
		<Form
			schema={reviewFormSchema}
			defaultValues={{
				headline: "Review",
				content: "Great product!",
				rating: 5,
				name: "user",
				email: "user@example.com",
			}}
			onSubmit={onSubmit}
			className="grid-cols-4"
			data-testid="add-review-form"
		>
			<FormField
				name="headline"
				label="Headline"
				description="This is title of the review"
				className="col-span-2"
			>
				<Input placeholder="Headline" />
			</FormField>
			<FormField name="name" label="Name" className="col-span-2">
				<Input placeholder="Name" />
			</FormField>
			<FormField name="content" label="Content" className="col-span-4">
				<Input placeholder="Content" />
			</FormField>
			<FormField name="rating" label="Rating" className="col-span-1">
				<Input placeholder="Rating" type="number" min={1} max={5} />
			</FormField>
			<FormField name="email" label="Email" className="col-span-3">
				<Input placeholder="Email" type="email" />
			</FormField>
		</Form>
	)
}
