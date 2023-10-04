import { Loader2 } from "lucide-react"
import React from "react"

import { BaseButton, type ButtonProps as BaseButtonProps } from "./BaseButton"

export interface ButtonProps extends BaseButtonProps {
	loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ loading, children, disabled, asChild, ...props }, ref) => {
		return (
			<BaseButton {...props} disabled={disabled || loading} asChild={asChild} ref={ref}>
				{asChild ? (
					children
				) : (
					<>
						{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{children}
					</>
				)}
			</BaseButton>
		)
	},
)
Button.displayName = "Button"
