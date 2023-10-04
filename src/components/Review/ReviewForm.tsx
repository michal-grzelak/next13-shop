"use client"

import { addReview } from "@serverActions"

import { FormField, Form } from "@ui/Form"
import { Input } from "@ui/Input"

import { reviewFormSchema } from "./constants"

type Props = {}

export const ReviewForm = ({}: Props) => {
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
			onSubmit={addReview}
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
			<FormField name="email" label="Email" className="col-span-2">
				<Input placeholder="Email" type="email" />
			</FormField>
		</Form>
	)
}
