import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

function debounce<Callback extends (...args: Array<unknown>) => void>(
	fn: Callback,
	delay: number,
) {
	console.log(`debounce() called`)
	
	let timer: ReturnType<typeof setTimeout> | null = null
	return (...args: Parameters<Callback>) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

function useDebounce<Callback extends (...args: Array<unknown>) => unknown>(
	callback: Callback,
	delay: number,
) {
	console.log('useDebounce() called')

	// 🐨 create a latest ref (via useRef and useEffect) here
	const latestCallbackRef = useRef(callback)
	useEffect(() => {
		latestCallbackRef.current = callback
	})

	// use the latest version of the callback here:
	// 💰 you'll need to pass an annonymous function to debounce. Do *not*
	// simply change this to `debounce(latestCallbackRef.current, delay)`
	// as that won't work. Can you think of why?
	// return useMemo(() => debounce(latestCallbackRef.current, delay), [delay])
	return useMemo(
		() => debounce((...args) => {
			console.log(args)

			latestCallbackRef.current(...args)
		}, delay)
		,
		[delay])
}

function App() {
	console.log(`App component start executing`)
	
	const [step, setStep] = useState(1)
	const [count, setCount] = useState(0)
	
	// 🦉 feel free to swap these two implementations and see they don't make
	// any difference to the user experience
	const increment = useCallback(() => setCount(currentStep => currentStep + step), [step])
	// const increment = () => setCount(currentStep => currentStep + step)
	const debouncedIncrement = useDebounce(increment, 3000)

	console.log(`App component start rendering`)

	return (
		<div>
			<div>
				<label>
					Step:{' '}
					<input
						type="number"
						step="1"
						min="1"
						max="10"
						onChange={e => setStep(Number(e.currentTarget.value))}
						defaultValue={step}
					/>
				</label>
			</div>
			<button onClick={debouncedIncrement}>{count}</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
