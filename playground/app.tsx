// import { useId } from 'react'
import { Input, Label } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from './toggle.tsx'

export function App() {
	console.log(`App component start executing...`)

	console.log(`App component start rendering...`)

	return (
		<div>
			<div>
				<Toggle>
					{/* 🐨 switch this label for the Label component from ./slots.tsx */}
					<Label>Party mode</Label>
					{/* 🐨 remove this id prop */}
					<ToggleButton />
					<ToggleOn>Let's party 🥳</ToggleOn>
					<ToggleOff>Sad town 😭</ToggleOff>
				</Toggle>
			</div>
			<hr />
			<div>
				<TextField>
					<Label>Venue</Label>
					<Input />
				</TextField>
			</div>
		</div>
	)
}
