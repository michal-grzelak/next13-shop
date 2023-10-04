"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod"
import { has } from "lodash"
import { type ReactNode } from "react"
import { type Path, useForm } from "react-hook-form"
import { type z, type ZodSchema, type ZodIssue } from "zod"

import { FormButton } from "@ui/Button"

import { FormProvider } from "./BaseForm"
import { RootFormMessage } from "./RootFormMessage"

type Props<T extends ZodSchema<any, any>> = {
	schema: T
	defaultValues: z.infer<T>
	onSubmit: (value: z.infer<T>) => Promise<void | ZodIssue[]> | (void | ZodIssue[])
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
		const errors = await onSubmit(value)

		if (!!errors && Array.isArray(errors)) {
			const values = form.getValues()
			const rootMessages: string[] = []

			errors.forEach((error) => {
				const path = error.path.join(".")

				if (has(values, path)) {
					form.setError(path as Path<z.infer<T>>, {
						type: "server",
						message: error.message,
					})
				} else {
					rootMessages.push(error.message)
				}
			})

			const rootErrorMessage = rootMessages.join(". ")
			form.setError("root", {
				type: "server",
				message: rootErrorMessage,
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
