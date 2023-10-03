"use client"

import { type ReactNode, type ComponentProps, cloneElement } from "react"

import {
	BaseFormItem,
	FormControl,
	FormDescription,
	type BaseFormField,
	FormLabel,
	FormMessage,
} from "./BaseForm"

export type FormItemProps = {
	label: ReactNode
	description?: ReactNode
	children: JSX.Element
	className?: string
}

export const FormItem = ({
	children,
	label,
	description,
	className, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FormItemProps): ComponentProps<typeof BaseFormField<any, any>>["render"] => {
	// eslint-disable-next-line react/display-name
	return ({ field }) => (
		<BaseFormItem className={className}>
			<FormLabel>{label}</FormLabel>
			<FormControl>{cloneElement(children, field)}</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</BaseFormItem>
	)
}
