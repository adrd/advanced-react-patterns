// import { Input, Label, Switch, Text } from './slots.tsx'
import { Input, Label, Switch, ToggleText } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle } from './toggle.tsx'

export function App() {
	return (
		<div>
			<div>
				<Toggle>
					<Label>Party mode</Label>
					{/* 🐨 switch this for the Switch slot component */}
					<Switch />
					{/* 🐨 change these to the Text slot component with appropriate slot props */}
					<ToggleText slot="onText">Let's party 🥳</ToggleText>
					<ToggleText slot="offText">Sad town 😭</ToggleText>

					{/* <Text slot="onText">Let's party 🥳</Text>
					<Text slot="offText">Sad town 😭</Text> */}
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
