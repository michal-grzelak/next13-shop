"use client"

import clsx from "clsx"
import { type ButtonHTMLAttributes, type ReactNode } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

export type Props = {
	children: ReactNode
	formAction?: ButtonHTMLAttributes<HTMLButtonElement>["formAction"]
	disablePending?: boolean
}

export const FormButton = ({ children, formAction, disablePending = false }: Props) => {
	const { pending } = useFormStatus()

	return (
		<button
			type="submit"
			disabled={!disablePending && pending}
			className={clsx(
				"disabled cursor-pointer rounded bg-neutral-300 px-3 py-1 text-sm text-black outline outline-1 outline-gray-600 transition-all duration-300 hover:bg-neutral-400 disabled:cursor-wait disabled:bg-neutral-100 disabled:outline-gray-200",
			)}
			formAction={formAction}
		>
			{children}
		</button>
	)
}
