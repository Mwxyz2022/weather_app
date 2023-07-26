/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AppContext } from '../../../context/AppContext'
import { WeatherService } from '../../../service/weather.service'
import { ICityData } from '../../../types/response.types'
import { AppContextValue } from '../../../types/types'
import { tempConvert } from '../../../utils/temp'
import Notification from '../../modal/notification/Notification'

import './search-bar.css'

const SearchBar: FC = () => {
	const [isCityAlreadyAdded, setIsCityAlreadyAdded] = useState<boolean>(false)
	const [isCityLimitExceeded, setIsCityLimitExceeded] = useState<boolean>(false)

	const { storedCities, setStoredCities } = useContext<AppContextValue>(AppContext)

	const [value, setValue] = useState<string>('')
	const [search, setSearch] = useState<string>('')
	const [cities, setCities] = useState<ICityData[]>([])

	const navigate = useNavigate()
	const { t } = useTranslation()

	const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const getCity = async () => {
		if (search.length <= 2 && cities.length) {
			setCities([])
		} else if (search.length > 2) {
			try {
				const { data: citiesData } = await WeatherService.findByCity(search)

				setCities(citiesData.list)
			} catch (error) {
				console.error(error)
			}
		}
	}

	const clearInput = () => {
		setValue('')
		setSearch('')
		setCities([])
	}

	const selectCityHandler = (city: ICityData) => {
		const cityExists = storedCities.some(storageCity => storageCity.id === city.id)

		if (cityExists) {
			setIsCityAlreadyAdded(true)
			return
		}

		if (storedCities.length === 5) {
			setIsCityLimitExceeded(true)
			clearInput()
			return
		}

		const newStorageCities = [...storedCities, city]

		localStorage.setItem('cities', JSON.stringify(newStorageCities))

		setStoredCities(newStorageCities)
		clearInput()

		navigate(`/city/${city.id}`)
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
		getCity()
	}, [search])

	useEffect(() => {
		const items = document.querySelectorAll('.list-item') as NodeListOf<HTMLElement>

		items.forEach((item, index) => {
			if (items.length === 1) {
				item.style.borderRadius = `2px 2px 2px 2px`
			}

			item.style.animationDelay = `${index * 0.1}s`
		})
	}, [cities])

	return (
		<>
			<section className='search__container'>
				<input
					className='search-input'
					type='text'
					placeholder={t('search_ph')}
					onChange={searchHandler}
					value={value}
				/>
				{!!cities.length && (
					<ul className='search-list'>
						{cities.map((city: any) => {
							return (
								<li key={city.id} className='list-item' onClick={() => selectCityHandler(city)}>
									<span>
										<img
											src={`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`}
											alt='flag'
										/>
										{city.name}, {city.sys.country}
									</span>
									<span>{tempConvert(city.main.temp)}°C</span>
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
