import { get, groupBy } from "lodash"
import { type ZodIssue } from "zod"

import { type ValidationError } from "@types"

export const mapZodErrorToValidationError = (
	issues: ZodIssue[],
	value: Record<string, unknown>,
): ValidationError[] => {
	const validationErrors: ValidationError[] = []
	const rootMessages: string[] = []

	const errorsWithMappedPath = issues.map((issue) => ({
		...issue,
		path: issue.path.join("."),
	}))
	const errorsGrouped = groupBy(errorsWithMappedPath, (error) => error.path)

	for (const path in errorsGrouped) {
		const errors = errorsGrouped[path]
		const message = errors.map((error) => error.message).join(", ")

		const propertyValue = get(value, path)
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

	return validationErrors
}
