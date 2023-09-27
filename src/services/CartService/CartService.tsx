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

	async addProduct(
		cartId: string,
		{ id: productId, price }: Pick<ProductFragment, "id" | "price">,
	): Promise<CartOrderItemFragment> {
		const res = await executeGraphql(CartAddProductDocument, {
			cartId,
			productId,
			total: price,
		})

		if (!res.createOrderItem) {
			throw new Error("Failed to add product to cart!")
		}

		return res.createOrderItem
	}
}
