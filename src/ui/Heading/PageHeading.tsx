import { type ReactNode } from "react"

type Props = { children: ReactNode }

export const PageHeading = ({ children }: Props) => {
	return <h1 className="text-lg font-bold uppercase text-slate-700">{children}</h1>
}
