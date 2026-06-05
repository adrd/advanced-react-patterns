import { createContext, use } from 'react'
import { Switch as BaseSwitch } from '#shared/switch'

type Slots = Record<string, Record<string, unknown>>
export const SlotContext = createContext<Slots>({})

function useSlotProps<Props>(
	props: Props & { slot?: string }, // 🐨 this should now be Props & { slot?: string }
	defaultSlot?: string, // 🐨 rename this to "defaultSlot" and make it optional
): Props {
	console.log(`useSlotProps() called`)
	console.log(`props = `, props)
	console.log(`defaultSlot = `, defaultSlot)

	// 🐨 create a slot variable that is set to props.slot and falls back to the defaultSlot
	// 🐨 if there's no slot, return the props as they are
	const slot = props.slot ?? defaultSlot
	if (!slot) return props

	const slots = use(SlotContext)
	
	console.log(`slots after calling use(SlotContext) = `, slots)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	const mergeProps = { ...slots[slot], slot, ...props } as Props

	console.log(`mergeProps = `, mergeProps)

	return mergeProps
}

// 🐨 add an optional slot to the props type here
export function Label(props: React.ComponentProps<'label'> & { slot?: string }) {
	
	console.log(`Label start executing...`)

	props = useSlotProps(props, 'label')

	console.log(`Label start rendering...`)
	
	return <label {...props} />
}

// 🐨 add an optional slot to the props type here
export function Input(props: React.ComponentProps<'input'> & { slot?: string }) {
	
	console.log(`Input start executing...`)

	props = useSlotProps(props, 'input')

	console.log(`Input start rendering...`)

	return <input {...props} />
}

// 🐨 add an optional slot to the props type here
export function Text(props: React.ComponentProps<'span'> & { slot?: string }) {
	
	console.log(`Text start executing...`)

	props = useSlotProps(props, 'text')
	
	console.log(`Text start rendering...`)

	return <span {...props} />
}

export function ToggleText(props: React.ComponentProps<'span'> & { slot: 'onText' | 'offText' }) {
	
	return <Text {...props} />
}

export function ToggleOn() {
	return <Text slot="onText"/>
}

// 🐨 add an optional slot to the props type here
export function Switch(props: Omit<React.ComponentProps<typeof BaseSwitch>, 'on'> & { slot?: string }) {

	console.log(`Switch start executing...`)

	console.log(`Switch start rendering...`)

	return (
		<BaseSwitch
			{...(useSlotProps(props, 'switch') as React.ComponentProps<
				typeof BaseSwitch
			>)}
		/>
	)
}
