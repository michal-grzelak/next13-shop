import { revalidateTag } from "next/cache"

import { EFetchTag } from "@services/constants"

export async function POST() {
	console.log("Revalidating product endpoints...")
	revalidateTag(EFetchTag.PRODUCTS)
	console.log("Products revalidated!")

	return new Response(null, { status: 200 })
}
