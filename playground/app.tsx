import { Switch } from '#shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	console.log(`App component start executing`)
	
	const { on, togglerProps } = useToggle()

	console.log(`togglerProps = `, togglerProps)

	console.log(`App component start rendering`)

	return (
		<div>
			<Switch on={on} {...togglerProps} />
			<hr />
			<button aria-label="custom-button" {...togglerProps}>
				{on ? 'on' : 'off'}
			</button>
		</div>
	)
}
