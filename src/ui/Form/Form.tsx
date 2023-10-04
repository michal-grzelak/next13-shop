"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode } from "react"
import { type Path, useForm } from "react-hook-form"
import { type z, type ZodSchema } from "zod"

import { type ValidationError } from "@types"
import { FormButton } from "@ui/Button"
import { cn } from "@utils/cn"

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
	className?: string
	"data-testid"?: string
}

export const Form = <T extends ZodSchema<any, any>>({
	schema,
	defaultValues,
	onSubmit,
	children,
	submitText = "Submit",
	className,
	"data-testid": dataTestId,
}: Props<T>): JSX.Element => {
	const form = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
	})

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
		} else {
			form.reset()
		}
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(_onSubmit)}
				className={cn("grid grid-flow-row gap-4", className)}
				data-testid={dataTestId}
			>
				{children}
				<RootFormMessage />
				<FormButton loading={form.formState.isSubmitting} className="col-span-full !mt-8">
					{submitText}
				</FormButton>
			</form>
		</FormProvider>
	)
}
