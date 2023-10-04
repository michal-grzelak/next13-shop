"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode } from "react"
import { type Path, useForm } from "react-hook-form"
import { type z, type ZodSchema } from "zod"

import { type ValidationError } from "@types"
import { FormButton } from "@ui/Button"

import { FormProvider } from "./BaseForm"
import { RootFormMessage } from "./RootFormMessage"

type Props<T extends ZodSchema<any, any>> = {
	schema: T
	defaultValues: z.infer<T>
	onSubmit: (
		value: z.infer<T>,
	) => Promise<void | { errors: ValidationError[] }> | (void | { errors: ValidationError[] })
	children: ReactNode
	submitText?: string
}

export const Form = <T extends ZodSchema<any, any>>({
	schema,
	defaultValues,
	onSubmit,
	children,
	submitText = "Submit",
}: Props<T>): JSX.Element => {
	const form = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
	})

	// TODO: extract common class on BE and return nice format from BE
	const _onSubmit = async (value: z.infer<T>) => {
		const result = await onSubmit(value)
		console.log(result)

		if (!!result && Array.isArray(result.errors)) {
			result.errors.forEach((error) => {
				form.setError(error.path as Path<z.infer<T>>, {
					type: "server",
					message: error.message,
				})
			})
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-8">
				{children}
				<RootFormMessage />
				<FormButton loading={form.formState.isSubmitting}>{submitText}</FormButton>
			</form>
		</FormProvider>
	)
}
