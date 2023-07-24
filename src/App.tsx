import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/header/Header'

import './assets/app.css'

import { AppContext } from './context/AppContext'
import { initCities } from './utils/local-storage/cities'
import { initFavorites } from './utils/local-storage/favorites'

const App: FC = () => {
	const [storedCities, setStoredCities] = useState(initCities())
	const [favoriteCities, setFavoriteCities] = useState(initFavorites())

	return (
		<AppContext.Provider
			value={{
				storedCities,
				setStoredCities,
				favoriteCities,
				setFavoriteCities
			}}
		>
			<Header />
			<main className='main'>
				<section className='main__container'>
					<Outlet />
				</section>
			</main>
			<div id='modal-root'></div>
		</AppContext.Provider>
	)
}

export default App
