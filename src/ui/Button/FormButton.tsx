"use client"

import React from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { Button, type ButtonProps } from "./Button"

interface Props extends Omit<ButtonProps, "type"> {
	disablePending?: boolean
}

export const FormButton = React.forwardRef<HTMLButtonElement, Props>(
	({ disablePending = false, loading, ...props }, ref) => {
		const { pending } = useFormStatus()

		return (
			<Button
				type="submit"
				loading={!disablePending && (pending || loading)}
				{...props}
				ref={ref}
			/>
		)
	},
)
FormButton.displayName = "FormButton"
