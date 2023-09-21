export type Pagination<D> = {
	meta: { page: number; pageCount: number; total: number; pageSize: number }
	data: D[]
}
