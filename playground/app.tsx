import { useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { useToggle,toggleReducer } from './toggle.tsx'

export function App() {
	console.log(`App component start executing`)

	const [timesClicked, setTimesClicked] = useState(0)
	const clickedTooMuch = timesClicked >= 4

	const { on, getTogglerProps, getResetterProps } = useToggle({
		reducer(state, action) {
			console.log(`reducer called `)
			console.log(`reducer state = `, state)
			console.log(`reducer action.type = `, action.type)

			if (action.type === 'toggle' && clickedTooMuch) {
				return state
			}
			
			return toggleReducer(state, action)
		},
	})

	console.log(`App component start rendering`)

	return (
		<div>
			<Switch
				{...getTogglerProps({
					on: on,
					onClick: () => setTimesClicked(count => count + 1),
				})}
			/>
			{clickedTooMuch ? (
				<div data-testid="notice">
					Whoa, you clicked too much!
					<br />
				</div>
			) : timesClicked > 0 ? (
				<div data-testid="click-count">Click count: {timesClicked}</div>
			) : null}
			<button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
				Reset
			</button>
		</div>
	)
}
