"use server"

import { CartService } from "@services"

export const setProductQuantity = async (itemId: string, quantity: number) => {
	const cartService = new CartService()

	await cartService.setProductQuantity(itemId, quantity)
}
