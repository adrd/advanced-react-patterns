import { useId } from 'react'
import { Input, Label } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from './toggle.tsx'

export function App() {
	console.log(`App component start executing...`)

	const partyModeId = useId()

	console.log(`App component start rendering...`)

	return (
		<div>
			<div>
				<Toggle>
					<label htmlFor={partyModeId}>Party mode</label>
					<ToggleButton id={partyModeId} />
					<ToggleOn>Let's party 🥳</ToggleOn>
					<ToggleOff>Sad town 😭</ToggleOff>
				</Toggle>
			</div>
			<hr />
			<div>
				{/* 🦉 feel free to test the id customization by passing an id here */}
				<TextField id="my-text">
					{/* 🦉 feel free to test the prop merging by passing props here */}
					<Label htmlFor="my-non-text">Venue</Label>
					<Input id="my-non-text" />
				</TextField>
			</div>
		</div>
	)
}
