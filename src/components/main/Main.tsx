/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from 'react'

import SearchBar from './search-bar/SearchBar'

import { CitiesContext } from '../../context/CitiesContext'
import { initCities } from '../../utils/cities'
import CardsContainer from './cards/CardsContainer'
import CitiesList from './cities-list/CitiesList'
import './main.css'

const Main: FC = () => {
	const [storedCities, setStoredCities] = useState(initCities())

	return (
		<CitiesContext.Provider value={{ storedCities, setStoredCities }}>
			<section className='upper__container'>
				<SearchBar />
				<CitiesList />
			</section>

			<CardsContainer />
		</CitiesContext.Provider>
	)
}

export default Main
