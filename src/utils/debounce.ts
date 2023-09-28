export const debounce = <TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	timeout: number,
) => {
	let timer: NodeJS.Timeout

	return (...args: TArgs) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			callback(...args)
		}, timeout)
	}
}
