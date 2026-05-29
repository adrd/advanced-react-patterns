import { createContext, use, useState } from 'react'
import { Switch } from '#shared/switch.tsx'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
// 💰 the default value should be `undefined`
// 🦺 the typing for the context value should be `{on: boolean; toggle: () => void}`
// but because we must initialize it to `undefined`, you need to union that with `undefined`
const ToggleContext = createContext<{on: boolean; toggle: () => void} | null>(null)

export function Toggle({ children }: { children: React.ReactNode }) {
	console.log(`Toggle called...`)
	
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)
	
	// 💣 remove this and instead return <ToggleContext.Provider> where
	// the value is an object that has `on` and `toggle` on it. Render children
	// within the provider.
	return (
		<ToggleContext.Provider value={{ on, toggle}}>
			{children}
		</ToggleContext.Provider>
	)
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	console.log(`ToggleOn called...`)
	
	// 🐨 instead of this constant value, we'll need to get that from
	const { on } = use(ToggleContext)!
	
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	console.log(`ToggleOff called...`)
	
	// 🐨 do the same thing to this that you did to the ToggleOn component
	const { on } = use(ToggleContext)!
	
	return <>{on ? null : children}</>
}

export function ToggleButton({...props}: Omit<React.ComponentProps<typeof Switch>, 'on'>) {
	console.log(`ToggleButton called...`)
	
	// 🐨 get `on` and `toggle` from the ToggleContext with `use`
	const { on, toggle} = use(ToggleContext)!
	
	return <Switch {...props} on={on} onClick={toggle}  />
}

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
