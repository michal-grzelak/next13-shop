import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { ChangeQuantity } from "@components/Cart"
import { CartService } from "@services"
import { PageHeading } from "@ui/Heading"

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value

	if (!cartId) {
		redirect("/")
	}

	const cartService = new CartService()
	const cart = await cartService.getCart({ id: cartId })

	if (!cart) {
		redirect("/")
	}

	return (
		<div>
			<PageHeading>
				Order <strong>#{cart.id}</strong> summary
			</PageHeading>
			<table className="table-fixed">
				<thead>
					<tr>
						<th className="px-4 text-center">Product</th>
						<th className="px-4 text-center">Quantity</th>
						<th className="px-4 text-center">Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.orderItems.map((item) => {
						if (!item.product) {
							return null
						}
						return (
							<tr key={item.product.id} className="leading-6">
								<td className="px-4">{item.product.name}</td>
								<td className="px-4 text-center">
									<ChangeQuantity quantity={item.quantity} itemId={item.id} />
								</td>
								<td className="px-4 text-center">{item.product.price}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
