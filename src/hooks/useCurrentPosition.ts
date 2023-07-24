import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import {
	findCityWithName,
	getCityName,
	putToStorage
} from '../utils/city.helper'
import { findClosestCity } from '../utils/closest-city'
import { useGeolocation } from './useGeolocation'

export const useCurrentPosition = () => {
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
}
