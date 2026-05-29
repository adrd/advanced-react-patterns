import { createContext, use } from 'react'

type Slots = Record<string, Record<string, unknown>>
export const SlotContext = createContext<Slots>({})

function useSlotProps<Props>(props: Props, slot: string): Props {
	console.log(`useSlotProps called...`)
	
	const slots = use(SlotContext)

	console.log(`slots = `, slots)
	console.log(`slots[slot] = `, slots[slot])
	console.log(`props = `, props)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	return { ...slots[slot], slot, ...props } as Props
}

export function Label(props: React.ComponentProps<'label'>) {
	console.log(`Label start executing...`)

	props = useSlotProps(props, 'label')

	console.log(`Label start rendering...`)
	
	return <label {...props} />
}

export function Input(props: React.ComponentProps<'input'>) {
	console.log(`Input start executing...`)

	props = useSlotProps(props, 'input')

	console.log(`Input start rendering...`)

	return <input {...props} />
}
