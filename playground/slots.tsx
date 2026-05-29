import { createContext, use } from "react"

// 🦺 create a Slots type that's just an object of objects
type Slots = Record<string, Record<string, unknown>>
// 🐨 create and export a SlotContext with that type and default it to an empty object
export const SlotContext = createContext<Slots>({})

// 🐨 create a useSlotProps hook which:
// 1. accepts props (any type) and slot (string)
// 2. gets the slots from the SlotContext
// 3. gets the props from the slot by its name
// 4. returns the merged props with the slot and given props
function useSlotProps<Props>(props: Props, slot: string): Props {
	console.log(`useSlotProps called...`)

	const slots = use(SlotContext)

	console.log(`slots = `, slots)
	console.log(`slots[slot] = `, slots[slot])
	console.log(`props = `, props)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	return { ...slots[slot], slot, ...props }
}

export function Label(props: React.ComponentProps<'label'>) {
	console.log(`Label start executing...`)
	
	// 🐨 get the props from useSlotProps for a slot called "label" and apply those to the label
	props = useSlotProps(props, 'label')
	
	console.log(`Label start rendering...`)

	return <label {...props} />
}

export function Input(props: React.ComponentProps<'input'>) {
	console.log(`Input start executing...`)
	
	// 🐨 get the props from useSlotProps for a slot called "label" and apply those to the input
	props = useSlotProps(props, 'input')
	
	console.log(`Input start rendering...`)

	return <input {...props} />
}
