import { createContext, use, useId, useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { SlotContext } from './slots';

// 🐨 add an id string to the ToggleValue type
type ToggleValue = { 
	id: string;
	on: boolean; 
	toggle: () => void 
}
const ToggleContext = createContext<ToggleValue | undefined>(undefined)
ToggleContext.displayName = 'ToggleContext'

// 🐨 update this to accept an optional id
export function Toggle({ id, children }: { id?: string, children: React.ReactNode }) {
	
	const [on, setOn] = useState(false)
	
	// 🐨 generate an id using useId (💰 similar to in text-field.tsx)
	const generatedId = useId()
	id = id ?? generatedId

	const toggle = () => setOn(!on)

	// 🐨 create labelProps that sets htmlFor to the id
	const labelProps = { htmlFor: id }

	// 🐨 wrap this in SlotContext.Provider and pass the labelProps in the label slot
	// 🐨 add the id to the value in the ToggleContext.Provider
	return (
		<SlotContext.Provider value={{ label: labelProps }}>
			<ToggleContext.Provider value={{ id, on, toggle }}>
				{children}
			</ToggleContext.Provider>
		</SlotContext.Provider>
	)
}

function useToggle() {
	const context = use(ToggleContext)
	if (context === undefined) {
		throw new Error(
			'Cannot find ToggleContext. All Toggle components must be rendered within <Toggle />',
		)
	}
	return context
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	const { on } = useToggle()
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	const { on } = useToggle()
	return <>{on ? null : children}</>
}

export function ToggleButton({...props}: Omit<React.ComponentProps<typeof Switch>, 'on'>) {
	console.log(`ToggleButton called...`)

	// 🐨 get the id out of useToggle
	const { id, on, toggle } = useToggle()

	// 🐨 pass the id for the ToggleButton here
	return <Switch {...props} id={id} on={on} onClick={toggle} />
}
