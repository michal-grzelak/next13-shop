import { type ZodIssue } from "zod"

export interface Pagination<D> {
	meta: { page: number; pageCount: number; pageSize: number }
	data: D[]
}

export interface ValidationError {
	path: string
	message: string
	code: ZodIssue["code"]
	fatal: boolean
}
