export interface Product {
	id: string
	title: string
	price: number
	description: string
	category: string
	rating: number
	image: { url: string; alt?: string }
}
