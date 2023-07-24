import { FC, useContext, useEffect } from 'react'

import SearchBar from './search-bar/SearchBar'

import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { useGeolocation } from '../../hooks/useGeolocation'
import {
	findCityWithName,
	getCityName,
	putToStorage
} from '../../utils/city.helper'
import { findClosestCity } from '../../utils/closest-city'
import CardsContainer from './cards/CardsContainer'
import './main.css'

const Main: FC = () => {
	const { loaded, coordinates } = useGeolocation()
	const { storedCities, setStoredCities } = useContext(AppContext)
	const { cityId } = useParams()
	const navigate = useNavigate()

	const navigateToFirst = () => {
		const firstCityTab = storedCities[0]
		const cityTabId = firstCityTab?.id
		navigate(`/city/${cityTabId}`)
	}

	useEffect(() => {
		if (storedCities.length && !cityId) {
			navigateToFirst()
		}
	}, [cityId])

	useEffect(() => {
		if (!storedCities.length && loaded) {
			const lat = coordinates.lat
			const lon = coordinates.lon
			;(async () => {
				const cityName = await getCityName(coordinates.lat, coordinates.lon)

				const citiesList = await findCityWithName(cityName)

				const closestCity = findClosestCity(citiesList.list, lat, lon)

				await putToStorage([closestCity], 'cities')

				setStoredCities([closestCity])
				navigateToFirst()
			})()
		}
	}, [loaded])

	return (
		<>
			<section className='upper__container'>
				<SearchBar />
			</section>

			<CardsContainer />
		</>
	)
}

export default Main
