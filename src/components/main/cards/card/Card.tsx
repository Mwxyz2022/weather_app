import { FC, useContext, useEffect, useState } from 'react'

import arrow from '../../../../assets/img/arrow.svg'
import pressure from '../../../../assets/img/pressure.svg'

import { MdOutlineClose } from 'react-icons/md'

import { useLocation, useNavigate } from 'react-router-dom'
import { WeatherService } from '../../../../api/weather.service'
import { AppContext } from '../../../../context/AppContext'
import { getStructuredData } from '../../../../utils/parse-data/parse-data'
import ChartDay from '../chart-day/ChartDay'
import ChartFiveDay from '../chart-day/ChartFiveDay'

import FavoriteButton from './favorite-button/FavoriteButton'

import { useTranslation } from 'react-i18next'
import './card.css'

interface ICardProps {
	initData: any
}

const Card: FC<ICardProps> = ({ initData }) => {
	const { storedCities, setStoredCities } = useContext(AppContext)
	const [cardLoader, setCardLoader] = useState<boolean>(true)
	const [cardData, setCardData] = useState<any>(null)
	const [isDayChart, setIsDayChart] = useState<boolean>(true)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { t } = useTranslation()

	const isCityPage = pathname.startsWith('/city/')

	const { id: cityId } = initData
	const { lat, lon } = initData.coord

	const onChartHandler = () => {
		setIsDayChart(!isDayChart)
	}

	const getWeatherInfo = async () => {
		setCardLoader(true)

		try {
			const { data: weatherInfo } = await WeatherService.getWeatherInfo(
				lat,
				lon
			)

			const cardData = getStructuredData(weatherInfo)

			setCardData(cardData)
		} catch (error) {
			console.error(error)
		} finally {
			setCardLoader(false)
		}
	}

	const deleteHandler = () => {
		const citiesList = storedCities.filter(
			(city: any) => city.id.toString() !== cityId
		)
		const lastCity = citiesList[citiesList.length - 1]
		const path = lastCity ? `/city/${lastCity.id}` : '/'

		setStoredCities(citiesList)
		localStorage.setItem('cities', JSON.stringify(citiesList))

		navigate(path)
	}

	useEffect(() => {
		getWeatherInfo()
	}, [initData])

	if (cardLoader) {
		return <div> LOADING... </div>
	}

	return (
		cardData && (
			<section className='card'>
				<div className='card__info'>
					<div className='info'>
						<div className='info__data'>
							<div className='temperature'>
								<img
									className='temperature__icon'
									src={`https://openweathermap.org/img/wn/${cardData.iconIndex}@2x.png`}
									alt='weather icon'
								/>
								<span className='temperature__value'>
									{`${cardData.currentTemp}°C`}
								</span>
							</div>

							{isCityPage && (
								<div className='data__location'>
									<p>
										{initData.name}, {initData.sys.country}
									</p>
									<img
										style={{ width: 25, marginLeft: 8 }}
										src={`https://openweathermap.org/images/flags/${initData.sys.country.toLowerCase()}.png`}
										alt='flag'
									/>
								</div>
							)}
						</div>

						{isCityPage && (
							<div className='actions'>
								<FavoriteButton cityId={cityId} />
								{storedCities.length > 1 && (
									<button className='button__favorite' onClick={deleteHandler}>
										<MdOutlineClose size={30} />
									</button>
								)}
							</div>
						)}
					</div>

					<div className='details'>
						<time className='data__date'>{cardData.localTime}</time>
						<p className='details__feels'>
							{`Feels like ${cardData.feelsLikeTemp}°C. ${cardData.descriptionWeather}. ${cardData.windSpeedString}`}
						</p>

						<div className='details__description'>
							<div className='description__wind'>
								<img
									src={arrow}
									alt='arrow wind'
									className='wind__icon'
									style={{
										transform: `rotate(${cardData.windDeg}deg)`
									}}
								/>
								<span className='wind__info'>{`${cardData.windSpeed}m/s ${cardData.windCompassString}`}</span>
							</div>
							<div className='description__pressure'>
								<img src={pressure} alt='pressure' className='pressure__icon' />
								<span className='pressure__info'>{`${cardData.pressure}hPa`}</span>
							</div>
						</div>

						<div className='details__description'>
							<span className='description__item'>{`Humidity: ${cardData.humidity}%`}</span>
							<span className='description__item'>{`UV: ${cardData.ultraviolet}`}</span>
						</div>

						<div className='details__description'>
							<span className='description__item'>{`Dew point: ${cardData.dewPoint}°C`}</span>
							<span className='description__item'>{`Visibility: ${cardData.visibility}kM`}</span>
						</div>
					</div>
				</div>
				<div className='chart__container'>
					{isDayChart ? (
						<ChartDay cardInfo={cardData.hourlyData} />
					) : (
						<ChartFiveDay cardInfo={cardData.dailyData} />
					)}
					<button className='info__toggler' onClick={onChartHandler}>
						{isDayChart ? t('five_day_forecast') : t('day_forecast')}
					</button>
				</div>
			</section>
		)
	)
}

export default Card
