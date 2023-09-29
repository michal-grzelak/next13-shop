"use client"

import { experimental_useOptimistic as useOptimistic } from "react"

import { FormButton } from "@ui/Button"
import { debounce } from "@utils/debounce"

import { setProductQuantity } from "./cartActions"

type Props = {
	itemId: string
	quantity: number
}

const handleSetQuantity = debounce(setProductQuantity, 200)

export const ChangeQuantity = ({ quantity, itemId }: Props) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	)

	const handleDecrement = async () => {
		const newQuantity = optimisticQuantity - 1

		setOptimisticQuantity(newQuantity)
		handleSetQuantity(itemId, newQuantity)
	}

	const handleIncrement = async () => {
		const newQuantity = optimisticQuantity + 1

		setOptimisticQuantity(newQuantity)
		handleSetQuantity(itemId, newQuantity)
	}

	return (
		<form className="grid grid-cols-3 items-center">
			<FormButton formAction={handleDecrement}>-</FormButton>
			{optimisticQuantity}
			<FormButton formAction={handleIncrement}>+</FormButton>
		</form>
	)
}
