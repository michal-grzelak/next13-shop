"use client"

import clsx from "clsx"
import { type ReactNode } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"

export type Props = { children: ReactNode }

export const FormButton = ({ children }: Props) => {
	const { pending } = useFormStatus()

	return (
		<button
			type="submit"
			disabled={pending}
			className={clsx(
				"disabled block cursor-pointer rounded bg-neutral-300 px-3 py-1.5 text-sm text-black outline outline-1 outline-gray-600 transition-all duration-300 hover:bg-neutral-400 disabled:cursor-wait disabled:bg-neutral-100 disabled:outline-gray-200",
			)}
		>
			{children}
		</button>
	)
}
