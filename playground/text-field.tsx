import { useId } from 'react'
import { SlotContext } from './slots'

export function TextField({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	console.log(`TextField start executing...`)

	const generatedId = useId()
	id = id ?? generatedId

	// 🐨 use these for the slot you render
	// const labelProps = { htmlFor: id }
	// const inputProps = { id }
	const slots = {
		label: { htmlFor: id },
		input: { id }
	}

	// 🐨 wrap this in a SlotContext.Provider with the value set to an object
	// that has a label and input property with the values of labelProps and
	// inputProps respectively.
	return <SlotContext.Provider value={slots}>
				{children}
			</SlotContext.Provider> 
}
