import { type MouseEventHandler, type ReactNode } from "react"

export type BaseProps = { children: ReactNode }

export type ClientButtonProps = BaseProps & { onClick: MouseEventHandler<HTMLButtonElement> }
