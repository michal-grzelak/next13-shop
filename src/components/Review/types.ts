import { type reviewFormSchema } from "."

import type z from "zod"

export type TReviewFormSubmitValue = z.infer<typeof reviewFormSchema>
