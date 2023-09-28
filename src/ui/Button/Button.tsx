import { getStyles } from "./styles"
import { type BaseProps } from "./types"

export const Button = ({ children }: BaseProps) => {
	return (
		<button type="submit" className={getStyles()}>
			{children}
		</button>
	)
}
