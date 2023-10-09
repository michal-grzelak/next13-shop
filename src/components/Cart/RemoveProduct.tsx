"use client"

import { FormButton } from "@ui/Button"

import { removeProductFromCart } from "./cartActions"

type Props = {
	itemId: string
}

export const RemoveProduct = ({ itemId }: Props) => {
	const handleRemove = async () => {
		await removeProductFromCart(itemId)
	}

	return (
		<form>
			<FormButton formAction={handleRemove}>Remove</FormButton>
		</form>
	)
}
