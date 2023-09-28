"use client"

import { experimental_useOptimistic as useOptimistic } from "react"

import { FormButton } from "@ui/Button"

import { setProductQuantity } from "./cartActions"

type Props = {
	itemId: string
	quantity: number
}

export const ChangeQuantity = ({ quantity, itemId }: Props) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	)

	const handleDecrement = async () => {
		const newQuantity = optimisticQuantity - 1

		setOptimisticQuantity(newQuantity)
		await setProductQuantity(itemId, newQuantity)
	}

	const handleIncrement = async () => {
		const newQuantity = optimisticQuantity + 1

		setOptimisticQuantity(newQuantity)
		await setProductQuantity(itemId, newQuantity)
	}

	return (
		<form>
			<FormButton formAction={handleDecrement} disablePending>
				-
			</FormButton>
			{optimisticQuantity}
			<FormButton formAction={handleIncrement} disablePending>
				+
			</FormButton>
		</form>
	)
}
