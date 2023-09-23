import { type Metadata } from "next"

import { Pagination } from "@components/Pagination"
import { ProductList } from "@components/Product"
import { ProductService } from "@services"
import { PageHeading } from "@ui/Heading"

type Props = {
	params: { slug: string; page: string }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
	const title = slug.toUpperCase()
	const description = `Products in category: ${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
		},
	}
}

export default async function ProductsByCategory({ params: { page, slug } }: Props) {
	const productService = new ProductService()
	const pageNumber = +page
	const { data: products, meta } = await productService.getProductsByCategorySlug({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		categorySlug: slug,
	})

	return (
		<>
			<PageHeading>Products in category: {slug.toUpperCase()}</PageHeading>

			<ProductList products={products}></ProductList>
			<Pagination page={pageNumber} pages={meta.pageCount} />
		</>
	)
}
