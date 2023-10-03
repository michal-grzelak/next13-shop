"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FormButton } from "@ui/Button"
import { Form, FormField, FormItem } from "@ui/Form"
import { Input } from "@ui/Input"

import { reviewFormSchema } from "./constants"
import { type TReviewFormSubmitValue } from "./types"

type Props = { onSubmit: (value: TReviewFormSubmitValue) => Promise<void> }

export const ReviewForm = ({ onSubmit }: Props) => {
	const form = useForm<TReviewFormSubmitValue>({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			username: "",
		},
	})

	const _onSubmit = async (values: TReviewFormSubmitValue) => {
		await onSubmit(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={FormItem({
						label: "Username",
						description: "This is your public display name.",
						children: <Input placeholder="shadcn" />,
					})}
				/>
				<FormButton>Submit</FormButton>
			</form>
		</Form>
	)
}
