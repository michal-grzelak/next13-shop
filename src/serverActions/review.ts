"use server"

import { ZodError } from "zod"

import { type TReviewFormSubmitValue } from "@components/Review"
import { reviewFormSchema } from "@components/Review/constants"
import { type ReviewFragment } from "@gql/graphql"
import { ProductService } from "@services"
import { type ValidationError } from "@types"
import { mapZodErrorToValidationError } from "@utils/mapZodErrorToValidationError"

export const addReview = async (
	productId: string,
	value: TReviewFormSubmitValue,
): Promise<undefined | ReviewFragment | { errors: ValidationError[] }> => {
	try {
		reviewFormSchema.parse(value)

		const productService = new ProductService()
		return await productService.addReview({ productId, ...value })
	} catch (error) {
		if (error instanceof ZodError) {
			const validationErrors = mapZodErrorToValidationError(error.issues, value)

			return { errors: validationErrors }
		}
	}

	return undefined
}
