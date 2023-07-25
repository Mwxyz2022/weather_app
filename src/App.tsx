import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import './assets/app.css'
import Header from './components/header/Header'
import { AppContext } from './context/AppContext'
import { ICityData } from './types/response.types'
import { initCities, initFavorites } from './utils/local-storage/init-storage'

const App: FC = () => {
	const [storedCities, setStoredCities] = useState<ICityData[]>(initCities())
	const [favoriteCities, setFavoriteCities] = useState<ICityData[]>(initFavorites())

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
