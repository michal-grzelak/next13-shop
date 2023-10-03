"use client"

import { type ReactNode, type ComponentProps, cloneElement } from "react"

import {
	BaseFormItem,
	FormControl,
	FormDescription,
	type FormField,
	FormLabel,
	FormMessage,
} from "./BaseForm"

type Props = { label: ReactNode; description?: ReactNode; children: JSX.Element }

export const FormItem = ({
	children,
	label,
	description, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Props): ComponentProps<typeof FormField<any, any>>["render"] => {
	// eslint-disable-next-line react/display-name
	return ({ field }) => (
		<BaseFormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>{cloneElement(children, field)}</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</BaseFormItem>
	)
}
