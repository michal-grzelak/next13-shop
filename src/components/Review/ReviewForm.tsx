"use client"

import { FormField, Form } from "@ui/Form"
import { Input } from "@ui/Input"

import { reviewFormSchema } from "./constants"
import { addReview } from "./reviewActions"

type Props = {}

export const ReviewForm = ({}: Props) => {
	return (
		<Form
			schema={reviewFormSchema}
			defaultValues={{
				nested: [
					{
						username: "",
					},
				],
			}}
			onSubmit={addReview}
		>
			<FormField
				name="nested[0].username"
				label="Username"
				description="This is your public display name."
			>
				<Input placeholder="shadcn" />
			</FormField>
		</Form>
	)
}
