import { createContext, use, useState } from 'react'
import { Switch } from '#shared/switch.tsx'

type ToggleValue = { 
	on: boolean; 
	toggle: () => void 
}
const ToggleContext = createContext<ToggleValue | null>(null)
ToggleContext.displayName = 'ToggleContext'

export function Toggle({ children }: { children: React.ReactNode }) {
	console.log(`Toggle called...`)
	
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)
	
	return (
		<ToggleContext.Provider value={{ on, toggle}}>
			{children}
		</ToggleContext.Provider>
	)
}

function useToggle() {
	console.log(`useToggle called`)

	const context = use(ToggleContext)

	if (context === null) {
		throw new Error(
			'Cannot find ToggleContext. All Toggle components must be rendered within <Toggle />',
		)
	}

	return context
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	console.log(`ToggleOn called...`)
	
	const { on } = useToggle()
	
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	console.log(`ToggleOff called...`)
	
	const { on } = useToggle()
	
	return <>{on ? null : children}</>
}

export function ToggleButton({...props}: Omit<React.ComponentProps<typeof Switch>, 'on'>) {
	console.log(`ToggleButton called...`)
	
	const { on, toggle} = useToggle()
	
	return <Switch {...props} on={on} onClick={toggle}  />
}
