import { CartCreateDocument, CartGetByIdDocument, type OrderFragment } from "@gql/graphql"
import { executeGraphql } from "@services/graphql"

export class CartService {
	async getCart({ id }: { id: string }): Promise<OrderFragment | null> {
		const res = await executeGraphql(CartGetByIdDocument, { cartId: id })

		if (!res.order) {
			return null
		}

		return res.order
	}

	async createCart(): Promise<OrderFragment | null> {
		const res = await executeGraphql(CartCreateDocument, {})

		if (!res.createOrder) {
			return null
		}

		return res.createOrder
	}
}
