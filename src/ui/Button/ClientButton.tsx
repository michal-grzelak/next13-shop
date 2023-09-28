"use client"

import { getStyles } from "./styles"
import { type ClientButtonProps } from "./types"

export const ClientButton = ({ children, onClick }: ClientButtonProps) => {
	return (
		<button onClick={onClick} className={getStyles()}>
			{children}
		</button>
	)
}
