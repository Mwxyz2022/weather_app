/* eslint-disable react-hooks/exhaustive-deps */
import { ResourceLanguage } from 'i18next'
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../../../context/AppContext'
import iconWeather from '../../../data/imageWeather'
import { getCityInfo } from '../../../helpers/city.helper'
import { WeatherService } from '../../../service/weather.service'
import { IFindCityData } from '../../../types/response.types'
import { AppContextValue } from '../../../types/types'
import Notification from '../../modal/notification/Notification'

import './search-bar.css'

type ResourcesType = {
	[key: string]: ResourceLanguage
}

const SearchBar: FC = () => {
	const [isCityAlreadyAdded, setIsCityAlreadyAdded] = useState<boolean>(false)
	const [isCityLimitExceeded, setIsCityLimitExceeded] = useState<boolean>(false)

	const { storedCities, setStoredCities } = useContext<AppContextValue>(AppContext)

	const [value, setValue] = useState<string>('')
	const [search, setSearch] = useState<string>('')
	const [citiesList, setCitiesList] = useState<IFindCityData[]>([])

	const navigate = useNavigate()
	const { t, i18n } = useTranslation()

	const resources = i18n.options.resources as ResourcesType
	const languages = Object.keys(resources)

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const getCitiesList = async () => {
		if (search.length <= 2 && citiesList.length) {
			setCitiesList([])
		} else if (search.length > 2) {
			try {
				const { data: citiesData } = await WeatherService.findCityByName(search)
				setCitiesList(citiesData.list)
			} catch (error) {
				console.error(error)
			}
		}
	}

	const clearInput = () => {
		setValue('')
		setSearch('')
		setCitiesList([])
	}

	const setCityData = async (lat: number, lon: number) => {
		const cityData = await getCityInfo(lat, lon, languages)

		const newStorageCities = [...storedCities, cityData]

		localStorage.setItem('cities', JSON.stringify(newStorageCities))
		setStoredCities(newStorageCities)
		clearInput()
		navigate(`/city/${cityData.id}`)
	}

	const selectCityHandler = (city: IFindCityData) => {
		if (storedCities.length === 5) {
			setIsCityLimitExceeded(true)
			clearInput()
			return
		}

		const cityExists = storedCities.some(
			storageCity =>
				storageCity.country_code === city.sys.country.toLowerCase() &&
				storageCity.location.en === city.name
		)

		if (cityExists) {
			setIsCityAlreadyAdded(true)
			return
		}
		const { lat, lon } = city.coord

		setCityData(lat, lon)
	}

	useEffect(() => {
		const handler = setTimeout(() => {
			setSearch(value)
		}, 500)

		return () => {
			clearTimeout(handler)
		}
	}, [value])

	useEffect(() => {
		getCitiesList()
	}, [search])

	useEffect(() => {
		const items = document.querySelectorAll('.list__item') as NodeListOf<HTMLElement>

		items.forEach((item, index) => {
			if (items.length === 1) {
				item.style.borderRadius = `2px 2px 2px 2px`
			}

			item.style.animationDelay = `${index * 0.1}s`
		})
	}, [citiesList])

	return (
		<>
			<section className='search__container'>
				<input
					className='search__input'
					type='text'
					placeholder={t('search_ph')}
					onChange={searchHandler}
					value={value}
				/>
				{!!citiesList.length && (
					<ul className='search__list'>
						{citiesList.map((city: IFindCityData) => {
							return (
								<li key={city.id} className='list__items' onClick={() => selectCityHandler(city)}>
									<span className='item__info'>
										<img
											className='info__icon'
											src={`https://flagicons.lipis.dev/flags/4x3/${city.sys.country.toLowerCase()}.svg`}
											alt='flag'
										/>

										<span className='info__name'>
											{city.name}, {city.sys.country}
										</span>
									</span>

									<img
										src={iconWeather[city.weather[0].icon]}
										alt='weather icon'
										style={{ width: '25px', height: '25px' }}
									/>

									<span>{Math.round(city.main.temp)}°C</span>
								</li>
							)
						})}
					</ul>
				)}
			</section>
			{isCityAlreadyAdded && (
				<Notification
					message={t('notification_already_list')}
					setOuterStore={setIsCityAlreadyAdded}
				/>
			)}
			{isCityLimitExceeded && (
				<Notification
					message={t('notification_limit_location')}
					setOuterStore={setIsCityLimitExceeded}
				/>
			)}
		</>
	)
}

export default SearchBar
