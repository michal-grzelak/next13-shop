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
	const description = `Products in collection: ${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
		},
	}
}

export default async function ProductsByCollection({ params: { page, slug } }: Props) {
	const productService = new ProductService()
	const pageNumber = +page
	const { data: products, meta } = await productService.getProductsByCollectionSlug({
		page: isNaN(pageNumber) ? 1 : pageNumber,
		collectionSlug: slug,
	})

	return (
		<>
			<PageHeading>Products in collection: {slug.toUpperCase()}</PageHeading>

			<ProductList products={products}></ProductList>
			<Pagination page={pageNumber} pages={meta.pageCount} />
		</>
	)
}
