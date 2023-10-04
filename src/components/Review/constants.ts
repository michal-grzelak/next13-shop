import z from "zod"

export const reviewFormSchema = z.object({
	headline: z.string(),
	content: z.string(),
	rating: z.coerce.number().min(1).max(5),
	name: z.string(),
	email: z.string().email(),
})
