import { Loader } from "./Loader"

export const PageLoader = () => {
	return (
		<div className="flex min-h-screen items-center justify-center align-middle" aria-busy="true">
			<Loader />
		</div>
	)
}
