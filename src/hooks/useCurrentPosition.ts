import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AppContext } from '../context/AppContext'
import { AppContextValue } from '../types/types'
import { findCityWithName, getCityName } from '../utils/city.helper'
import { findClosestCity } from '../utils/closest-city'

import { useGeolocation } from './useGeolocation'

export const useCurrentPosition = () => {
	const { loaded, coordinates } = useGeolocation()
	const { storedCities, setStoredCities } = useContext<AppContextValue>(AppContext)
	const { cityId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (storedCities.length && !cityId) {
			const firstCityTab = storedCities[0]
			if (firstCityTab) {
				const cityTabId = firstCityTab.id
				navigate(`/city/${cityTabId}`)
			}
		}
	}, [cityId])

	useEffect(() => {
		if (!storedCities.length && loaded) {
			const lat = coordinates.lat
			const lon = coordinates.lon

			;(async () => {
				const cityName = await getCityName(lat, lon)
				const citiesList = await findCityWithName(cityName)
				const closestCity = findClosestCity(citiesList, lat, lon)

				if (closestCity) {
					localStorage.setItem('cities', JSON.stringify([closestCity]))
					setStoredCities([closestCity])

					navigate(`/city/${closestCity.id}`)
				} else {
					console.error('No closest city found.')
				}
			})()
		}
	}, [loaded])
}
