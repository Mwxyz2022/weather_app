/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { AppContext } from '../context/AppContext'
import { getCityAllInfo } from '../helpers/city.helper'
import { AppContextValue } from '../types/types'

import { useGeolocation } from './useGeolocation'

export const useCurrentPosition = () => {
	const { loaded, coordinates } = useGeolocation()
	const { storedCities, setStoredCities } = useContext<AppContextValue>(AppContext)
	const { cityId } = useParams()
	const navigate = useNavigate()
	const { i18n } = useTranslation()
	const languages = [...i18n.languages]

	const setCityInfo = async (lat = coordinates.lat, lon = coordinates.lon) => {
		if (!storedCities.length && loaded) {
			const cityData = await getCityAllInfo(lat, lon, languages)
			localStorage.setItem('cities', JSON.stringify([cityData]))
			setStoredCities([cityData])
			navigate(`/city/${cityData.id}`)
		}
	}

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
		setCityInfo()
	}, [loaded])
}
