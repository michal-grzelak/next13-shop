"use server"
import z, { ZodError } from "zod"

import { reviewFormSchema } from "./constants"
import { type TReviewFormSubmitValue } from "./types"

export const addReview = async (value: TReviewFormSubmitValue) => {
	const newSchema = reviewFormSchema.extend({
		nested: z.object({
			username: z.string().max(1, { message: "max length 1" }),
			test: z.string({ required_error: "Error returned from server" }),
		}),
	})

	try {
		newSchema.parse(value)
	} catch (error) {
		if (error instanceof ZodError) {
			return error.issues
		}
	}
}
