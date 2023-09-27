import { CartCreateDocument, CartGetByIdDocument, type OrderFragment } from "@gql/graphql"
import { executeGraphql } from "@services/graphql"

export class CartService {
	async getCart({ id }: { id: string }): Promise<OrderFragment | null> {
		const res = await executeGraphql(CartGetByIdDocument, { cartId: id })

		if (!res.orders?.length) {
			return null
		}

		return res.orders[0]
	}

	async createCart(): Promise<OrderFragment | null> {
		const res = await executeGraphql(CartCreateDocument, {})

		if (!res.createOrder) {
			return null
		}

		return res.createOrder
	}
}
