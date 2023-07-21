/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'
import { WeatherService } from '../../../api/weather.service'
import { CitiesContext } from '../../../context/CitiesContext'
import { tempConvert } from '../../../utils/temp'
import './search-bar.css'

const SearchBar: FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const { setStoredCities } = useContext(CitiesContext)

	const [value, setValue] = useState<string>('')

	const [search, setSearch] = useState<string>('')

	const [cities, setCities] = useState([])

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

	const selectCityHandler = (city: any) => {
		const storageData = localStorage.getItem('cities')
		const storageCities = storageData ? JSON.parse(storageData) : []
		if (storageCities.length === 5) {
			clearInput()
			return
		}

		const uniqCities = storageCities.filter(
			(storageCity: any) => storageCity.id !== city.id
		)

		const newStorageCities = [...uniqCities, city]

		try {
			window.localStorage.setItem('cities', JSON.stringify(newStorageCities))
			setStoredCities(newStorageCities)
		} catch (error) {
			console.log(error)
		}
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

	return (
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
							<li
								key={city.id}
								className='list-item'
								onClick={() => selectCityHandler(city)}
							>
								<span>
									<img
										src={`https://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`}
										alt='flag'
									/>
									{city.name},{city.sys.country}
								</span>
								<span>{tempConvert(city.main.temp)}°C</span>

								{/* 
								// TO-DO 
								<span>{city.weather[0].icon}</span> */}
							</li>
						)
					})}
				</ul>
			)}
		</section>
	)
}

export default SearchBar
