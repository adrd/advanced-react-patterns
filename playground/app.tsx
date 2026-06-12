import { useState } from 'react'
import { Toggle, type ToggleAction, type ToggleState } from './toggle.tsx'

export function App() {
	console.log(`App component start executing`)
	
	const [bothOn, setBothOn] = useState(true)
	const [timesClicked, setTimesClicked] = useState(0)

	console.log(`bothOn = ${bothOn}`)
	console.log(`timesClicked = ${timesClicked}`)
	
	function handleToggleChange(state: ToggleState, action: ToggleAction) {
		console.log(`handleToggleChange called with action = ${action.type}`)

		if (action.type === 'toggle' && timesClicked > 4) {
			return
		}

		setBothOn(state.on)
		setTimesClicked(c => c + 1)
	}
	
	function handleResetClick() {
		console.log(`handleResetClick called`)

		setBothOn(false)
		setTimesClicked(0)
	}
	
	console.log(`App component start rendering`)
	
	return (
		<div>
			<div>
				<Toggle on={bothOn} onChange={handleToggleChange} />
				<Toggle on={bothOn} onChange={handleToggleChange} />
			</div>

			{timesClicked > 4 ? (
				<div data-testid="notice">
					Whoa, you clicked too much!
					<br />
				</div>
			) : (
				<div data-testid="click-count">Click count: {timesClicked}</div>
			)}

			<button onClick={handleResetClick}>Reset</button>
			<hr />
			
			<div>
				<div>Uncontrolled Toggle:</div>
				<Toggle
					onChange={(...args) => {
						console.info('Uncontrolled Toggle onChange', ...args)
						debugger
					}
						
					}
				/>
			</div>
		</div>
	)
}
