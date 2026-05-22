import React, { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { PokemonDataView, allPokemon } from '#shared/pokemon.tsx'
import { type PokemonData, type User } from '#shared/types.tsx'

function App() {
	console.log('App component start executing...')
	
	const [user] = useState<User>({ name: 'Kody', image: '/img/kody.png' })
	const [pokemonList] = useState<Array<PokemonData>>(() =>
		Object.values(allPokemon),
	)
	const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
		null,
	)

	console.log('App component start rendering...')

	return (
		<div
			id="app-root"
			style={{ ['--accent-color' as any]: selectedPokemon?.color ?? 'black' }}
		>
			{/*
				🐨 make Nav accept a ReactElement prop called "avatar"
				instead of a User prop called "user"
			*/}
			{/* <Nav user={user} /> */}
			<Nav avatar={<img src={user.image} alt={`${user.name} profile`} />} />
			<div className="spacer" data-size="lg" />
			{/*
				🐨 make Main accept ReactElement props called "sidebar" and "content"
				instead of the props it accepts right now.
			*/}
			{/* <Main
				pokemonList={pokemonList}
				selectedPokemon={selectedPokemon}
				setSelectedPokemon={setSelectedPokemon}
			/> */}
			<Main
				sidebar={
					<List
						listItems={pokemonList.map(p => (
							<li key={p.id}>
								<PokemonListItemButton
									pokemon={p}
									onClick={() => setSelectedPokemon(p)}
								/>
							</li>
						))}
					/>
				}
				content={<Details selectedPokemon={selectedPokemon} />}
			/>
			<div className="spacer" data-size="lg" />
			{/*
				🐨 make Footer accept a String prop called "footerMessage"
				instead of the User prop called "user"
			*/}
			<Footer footerMessage = {`Don't have a good day–have a great day, ${user.name}`} />
		</div>
	)
}

// 🐨 this should accept an avatar prop that's a ReactElement 
// function Nav({ user }: { user: User }) {
function Nav({ avatar }: { avatar: React.ReactNode }) {
	console.log('Nav component start executing...')

	console.log('Nav component start rendering...')

	return (
		<nav>
			<ul>
				<li>
					<a href="#/home">Home</a>
				</li>
				<li>
					<a href="#/about">About</a>
				</li>
				<li>
					<a href="#/contact">Contact</a>
				</li>
			</ul>
			<a href="#/me" title="User Settings">
				{/* 🐨 render the avatar prop here instead of the img */}
				{/* <img src={user.image} alt={`${user.name} profile`} /> */}
				{avatar}
			</a>
		</nav>
	)
}

function Main({
	// 🐨 all these props should be removed in favor of the sidebar and content props
	// pokemonList,
	// selectedPokemon,
	// setSelectedPokemon,
	sidebar,
	content	
}: {
	// pokemonList: Array<PokemonData>
	// selectedPokemon: PokemonData | null
	// setSelectedPokemon: (pokemon: PokemonData) => void
	sidebar: React.ReactNode,
	content: React.ReactNode
}) {
	console.log('Main component start executing...')

	console.log('Main component start rendering...')

	return (
		<main>
			{/* 🐨 put the sidebar and content props here */}
			{/* <List pokemonList={pokemonList} setSelectedPokemon={setSelectedPokemon} /> */}
			{/* <Details selectedPokemon={selectedPokemon} /> */}
			{sidebar}
			{content}
		</main>
	)
}

function List({
	// 🐨 make this accept an array of ReactElements called "listItems"
	// and remove the existing props
	// pokemonList,
	// setSelectedPokemon,
	listItems
}: {
	// pokemonList: Array<PokemonData>
	// setSelectedPokemon: (pokemon: PokemonData) => void
	listItems: React.ReactNode
}) {
	console.log('List component start executing...')

	console.log('List component start rendering...')

	return (
		<div className="pokemon-list">
			<ul>
				{/* 🐨 render the listItems here */}
				{/* {pokemonList.map(p => (
					<li key={p.id}>
						<PokemonListItemButton
							pokemon={p}
							onClick={() => setSelectedPokemon(p)}
						/>
					</li>
				))} */}
				{listItems}
			</ul>
		</div>
	)
}

function PokemonListItemButton({
	pokemon,
	onClick,
}: {
	pokemon: PokemonData
	onClick: () => void
}) {
	console.log('PokemonListItemButton component start executing...')

	console.log('PokemonListItemButton component start rendering...')

	return (
		<button
			className="pokemon-item"
			onClick={onClick}
			style={{ ['--accent-color' as any]: pokemon.color }}
			aria-label={pokemon.name}
		>
			<img src={pokemon.image} alt={pokemon.name} />
			<div className="pokemon-list-info">
				<strong>{pokemon.name}</strong>
				<small>{`(${pokemon.number})`}</small>
			</div>
		</button>
	)
}

function Details({ selectedPokemon }: { selectedPokemon: PokemonData | null }) {
	console.log('Details component start executing...')

	console.log('Details component start rendering...')	

	return (
		<div className="pokemon-details">
			{selectedPokemon ? (
				<PokemonDataView pokemon={selectedPokemon} />
			) : (
				<div>Select a Pokemon</div>
			)}
		</div>
	)
}

// 🐨 make this accept a footerMessage string instead of the user 
function Footer({ footerMessage }: { footerMessage: string }) {
	console.log('Footer component start executing...')

	console.log('Footer component start rendering...')	

	return (
		<footer>
			<p>{footerMessage}</p>
		</footer>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
