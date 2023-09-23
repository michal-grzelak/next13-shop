"use client"

import { type ReactNode, createContext, useState } from "react"

export type ProductContext = {
	selectedVariant: string | undefined
	onSelectVariant: (args: { id: string }) => void
}

export const ProductContext = createContext<ProductContext>({
	selectedVariant: undefined,
	onSelectVariant: () => {},
})

type Props = {
	children: ReactNode
}

export const ProductProvider = ({ children }: Props) => {
	const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined)

	const onSelectVariant: ProductContext["onSelectVariant"] = ({ id }) => setSelectedVariant(id)

	return (
		<ProductContext.Provider value={{ selectedVariant, onSelectVariant }}>
			{children}
		</ProductContext.Provider>
	)
}
