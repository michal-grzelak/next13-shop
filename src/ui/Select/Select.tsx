"use client"

import { type ReactNode, useId } from "react"

import {
	BaseSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./BaseSelect"

export type SelectItem<T = string> = { value: T; label: ReactNode }
export type SelectGroup<T = string> = { label: ReactNode; items: SelectItem<T>[] }

type Props<T = string> = {
	placeholder: ReactNode
	items: SelectItem<T>[] | SelectGroup<T>[]
	disabled?: boolean
	onSelect?: (value: T) => void
	value?: T
	defaultValue?: T
}

export const Select = <T,>({
	placeholder,
	items,
	disabled,
	value,
	defaultValue,
	onSelect: _onSelect,
}: Props<T>) => {
	const id = useId()

	const onSelect = (value: string) => {
		const parsedValue = JSON.parse(value) as T

		_onSelect!(parsedValue)
	}

	return (
		<BaseSelect
			disabled={disabled}
			onValueChange={_onSelect ? onSelect : undefined}
			value={value ? JSON.stringify(value) : undefined}
			defaultValue={defaultValue ? JSON.stringify(defaultValue) : undefined}
		>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item, index) => {
					if ("items" in item) {
						return (
							<SelectGroup key={`select-group-${index}-${id}`}>
								<SelectLabel>{item.label}</SelectLabel>
								{item.items.map((item, index) => (
									<SelectItem key={`select-item-${index}-${id}`} value={JSON.stringify(item.value)}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						)
					} else {
						return (
							<SelectItem key={`select-item-${index}-${id}`} value={JSON.stringify(item.value)}>
								{item.label}
							</SelectItem>
						)
					}
				})}
			</SelectContent>
		</BaseSelect>
	)
}
