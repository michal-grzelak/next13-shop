import { cookies } from "next/headers"

import {
	CartCreateDocument,
	CartGetByIdDocument,
	type CartOrderItemFragment,
	type CartOrderFragment,
	type ProductFragment,
	CartAddProductDocument,
} from "@gql/graphql"
import { executeGraphql } from "@services/graphql"

export class CartService {
	async getCart({ id }: { id: string }): Promise<CartOrderFragment | null> {
		const res = await executeGraphql(CartGetByIdDocument, { cartId: id })

		if (!res.order) {
			return null
		}

		return res.order
	}

	async createCart(): Promise<CartOrderFragment> {
		const res = await executeGraphql(CartCreateDocument, {})

		if (!res.createOrder) {
			throw new Error("Failed to create cart!")
		}

		return res.createOrder
	}

	async getOrCreateCart(): Promise<CartOrderFragment> {
		const cartId = cookies().get("cartId")?.value

		if (cartId) {
			const cart = await this.getCart({ id: cartId })
			if (cart) {
				return cart
			}
		}

		return this.createCart()
	}

	async addProduct(
		cartId: string,
		productId: string,
		{ quantity, total, orderItemId }: { quantity: number; total: number; orderItemId?: string },
	): Promise<CartOrderItemFragment> {
		const res = await executeGraphql(CartAddProductDocument, {
			cartId,
			productId,
			total,
			quantity: quantity ?? 1,
			orderItemId,
		})

		if (!res.upsertOrderItem) {
			throw new Error("Failed to add product to cart!")
		}

		return res.upsertOrderItem
	}

	async addProductHelper(
		cart: CartOrderFragment,
		product: ProductFragment,
		quantity: number = 1,
	): Promise<CartOrderItemFragment> {
		const existingOrderItem = cart.orderItems.find(
			(orderItem) => orderItem.product?.id === product.id,
		)

		const newQuantity = quantity + (existingOrderItem?.quantity ?? 0)
		const newTotal = product.price + (existingOrderItem?.total ?? 0)

		return this.addProduct(cart.id, product.id, {
			quantity: newQuantity,
			total: newTotal,
			orderItemId: existingOrderItem?.id,
		})
	}
}
