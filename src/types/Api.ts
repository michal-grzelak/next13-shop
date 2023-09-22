export type Pagination<D> = {
	meta: { page: number; pageCount: number; pageSize: number }
	data: D[]
}
