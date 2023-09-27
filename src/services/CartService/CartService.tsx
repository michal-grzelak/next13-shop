import { cookies } from "next/headers"

import { CartCreateDocument, CartGetByIdDocument, type CartOrderFragment } from "@gql/graphql"
import { executeGraphql } from "@services/graphql"

export class CartService {
	async getCart({ id }: { id: string }): Promise<CartOrderFragment | null> {
		const res = await executeGraphql(CartGetByIdDocument, { cartId: id })

		if (!res.order) {
			return null
		}

		return res.order
	}

	async createCart(): Promise<CartOrderFragment | null> {
		const res = await executeGraphql(CartCreateDocument, {})

		if (!res.createOrder) {
			return null
		}

		return res.createOrder
	}

	async getOrCreateCart(): Promise<CartOrderFragment | null> {
		const cartId = cookies().get("cartId")?.value

		if (cartId) {
			const cart = await this.getCart({ id: cartId })
			if (cart) {
				return cart
			}
		}

		return this.createCart()
	}
}
