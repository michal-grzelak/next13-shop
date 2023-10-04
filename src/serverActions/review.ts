"use server"

import { ZodError } from "zod"

import { type TReviewFormSubmitValue } from "@components/Review"
import { reviewFormSchema } from "@components/Review/constants"
import { type ValidationError } from "@types"
import { mapZodErrorToValidationError } from "@utils/mapZodErrorToValidationError"

export const addReview = async (
	value: TReviewFormSubmitValue,
): Promise<void | { errors: ValidationError[] }> => {
	try {
		reviewFormSchema.parse(value)
	} catch (error) {
		if (error instanceof ZodError) {
			const validationErrors = mapZodErrorToValidationError(error.issues, value)

			return { errors: validationErrors }
		}
	}
}
