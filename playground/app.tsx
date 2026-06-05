import { Switch } from '#shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	console.log(`App component start executing`)

	// 💣 delete this:
	// const getTogglerProps = (props: any) => props
	// 🐨 destructure the getTogglerProps function from useToggle
	const { on, getTogglerProps } = useToggle()
	
	console.log(`App component start rendering`)
	
	return (
		<div>
			<Switch {...getTogglerProps({ on })} />
			{/* <Switch {...getTogglerProps({ on, onClick: () => console.info('onSliderMoved') })} /> */}
			<hr />
			<button
				{...getTogglerProps({
					'aria-label': 'custom-button',
					onClick: () => console.info('onButtonClick'),
					id: 'custom-button-id',
				})}
			>
				{on ? 'on' : 'off'}
			</button>
		</div>
	)
}
