"use server"

import { revalidateTag } from "next/cache"

import { CartService } from "@services"

export const setProductQuantity = async (itemId: string, quantity: number) => {
	const cartService = new CartService()

	await cartService.setProductQuantity(itemId, quantity)
}

export const removeProductFromCart = async (itemId: string) => {
	const cartService = new CartService()

	await cartService.removeProduct(itemId)

	revalidateTag("cart")
}
