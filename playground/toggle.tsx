import { useState } from 'react'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	console.log(`callAll() called`)
	console.log(`fns = `, fns)

	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

export function useToggle() {
	console.log(`useToggle() called`)

	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	// 🐨 create a function called getTogglerProps that accepts an object
	// of props and returns an object of props that includes 'aria-clicked' and onClick.

	// 💰 Make sure to handle the case where the user provides their own
	// 'aria-checked' and 'onClick' props (as well as if they don't or if they
	// provide more props).

	function getTogglerProps<Props>({
		onClick,
		...props
	}: {
		onClick?: React.DOMAttributes<HTMLButtonElement>['onClick']
	} & Props) {
		return {
			'aria-checked': on,
			onClick: callAll(onClick, toggle),
			...props,
		}
	}

	return {
		on,
		toggle,
		// 🐨 swap togglerProps with getTogglerProps
		getTogglerProps
		// togglerProps: {
		// 	'aria-checked': on,
		// 	onClick: toggle,
		// },
	}
}
