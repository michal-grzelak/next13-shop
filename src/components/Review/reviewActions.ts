"use server"
import { get, groupBy } from "lodash"
import z, { ZodError } from "zod"

import { type ValidationError } from "@types"

import { reviewFormSchema } from "./constants"
import { type TReviewFormSubmitValue } from "./types"

export const addReview = async (
	value: TReviewFormSubmitValue,
): Promise<void | { errors: ValidationError[] }> => {
	const newSchema = reviewFormSchema.extend({
		nested: z.array(
			z.object({
				username: z.string().min(10).max(1),
			}),
		),
	})

	try {
		newSchema.parse(value)
	} catch (error) {
		if (error instanceof ZodError) {
			const validationErrors: ValidationError[] = []
			const rootMessages: string[] = []

			const errorsWithMappedPath = error.issues.map((issue) => ({
				...issue,
				path: issue.path.join("."),
			}))
			const errorsGrouped = groupBy(errorsWithMappedPath, (error) => error.path)

			for (const path in errorsGrouped) {
				const errors = errorsGrouped[path]
				const message = errors.map((error) => error.message).join(", ")

				const propertyValue = get(value, path) as unknown
				if (!!propertyValue && typeof propertyValue !== "object") {
					validationErrors.push({
						path,
						message: message,
						code: errors[0].code,
						fatal: !!errors[0].fatal,
					})
				} else {
					rootMessages.push(message)
				}
			}

			if (rootMessages.length) {
				const rootErrorMessage = rootMessages.join(", ")
				validationErrors.push({
					path: "root",
					code: "custom",
					message: rootErrorMessage,
					fatal: true,
				})
			}

			return { errors: validationErrors }
		}
	}
}
