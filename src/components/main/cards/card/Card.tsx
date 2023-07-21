import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { initCardInfo } from '../../../../utils/cities'

import moment from 'moment'
import { WeatherService } from '../../../../api/weather.service'
import { CitiesContext } from '../../../../context/CitiesContext'
import { describeWindSpeed } from '../../../../utils/wind-speed'

import arrow from '../../../../assets/img/arrow.svg'
import pressure from '../../../../assets/img/pressure.svg'

import { degToCompass } from '../../../../utils/deg-compass'
import ChartDay from '../chart-day/ChartDay'
import ChartFiveDay from '../chart-day/ChartFiveDay'

import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import './card.css'

const Card: FC = () => {
	const { storedCities } = useContext(CitiesContext)
	const [cardLoader, setCardLoader] = useState<boolean>(true)
	const [isDayChart, setIsDayChart] = useState<boolean>(false)
	const { cityId } = useParams()
	const navigate = useNavigate()

	const init = cityId ? initCardInfo(cityId) : null

	const [cardInfo, setCardInfo] = useState<any>(null)

	const getWeatherInfo = async () => {
		try {
			const { data: weatherInfo } = await WeatherService.getWeatherInfo(
				init.coord.lat,
				init.coord.lon
			)

			setCardInfo(weatherInfo)
		} catch (error) {
			console.error(error)
		} finally {
			setCardLoader(false)
		}
	}

	const name = storedCities.reduce((acc: string, city: any) => {
		if (city.id.toString() === cityId) {
			return `${city.name}, ${city.sys.country}`
		}
		return acc
	}, '')

	const cityStorage = storedCities.find(
		(city: any) => city.id.toString() === cityId
	)
	const flag = cityStorage.sys.country.toLowerCase()

	console.log('flag', flag)
	console.log(cardInfo)

	const onChartToggle = () => {
		setIsDayChart(!isDayChart)
	}

	useEffect(() => {
		getWeatherInfo()
	}, [cityId])

	if (!init) {
		navigate('/')
	}

	if (cardLoader) {
		return <div> LOADING...</div>
	}

	const localTime = moment
		.unix(cardInfo.current.dt)
		.utcOffset(cardInfo.timezone_offset / 60)
		.format('MMM DD, h:mmA')

	let descriptionWeather = cardInfo.current.weather[0].description
	descriptionWeather =
		descriptionWeather.charAt(0).toUpperCase() + descriptionWeather.slice(1)

	return (
		cardInfo && (
			<>
				<section className='card'>
					<div className='card__info'>
						<div className='info'>
							<div className='info__data'>
								<div className='temperature'>
									<img
										className='temperature__icon'
										src={`https://openweathermap.org/img/wn/${cardInfo.current.weather[0].icon}@2x.png`}
										alt='weather icon'
									/>
									<span className='temperature__value'>
										{`${Math.round(cardInfo.current.temp)}°C`}
									</span>
								</div>
								<div className='data__location'>
									<p>{name}</p>
									<img
										style={{ width: 25, marginLeft: 8 }}
										src={`https://openweathermap.org/images/flags/${flag}.png`}
										alt='flag'
									/>
								</div>
							</div>
							<button className='button__favorite'>
								<AiOutlineStar size={30} />{' '}
								<AiTwotoneStar size={30} style={{ color: 'orange' }} />
							</button>
						</div>

						<div className='details'>
							<time className='data__date'>{localTime}</time>
							<p className='details__feels'>
								{`Feels like ${Math.round(
									cardInfo.current.feels_like
								)}°C. ${descriptionWeather}. ${describeWindSpeed(
									cardInfo.current.wind_speed
								)}`}
							</p>

							<div className='details__description'>
								<div className='description__wind'>
									<img
										src={arrow}
										alt='arrow wind'
										className='wind__icon'
										style={{
											transform: `rotate(${cardInfo.current.wind_deg}deg)`,
										}}
									/>
									<span className='wind__info'>{`${
										Math.round(cardInfo.current.wind_speed * 10) / 10
									}m/s ${degToCompass(cardInfo.current.wind_deg)}`}</span>
								</div>
								<div className='description__pressure'>
									<img
										src={pressure}
										alt='pressure'
										className='pressure__icon'
										style={{
											transform: `rotate(${cardInfo.current.wind_deg}deg)`,
										}}
									/>
									<span className='pressure__info'>{`${cardInfo.current.pressure}hPa`}</span>
								</div>
							</div>

							<div className='details__description'>
								<span className='description__item'>{`Humidity: ${cardInfo.current.humidity}%`}</span>
								<span className='description__item'>{`UV: ${Math.round(
									cardInfo.current.uvi
								)}`}</span>
							</div>

							<div className='details__description'>
								<span className='description__item'>{`Dew point: ${Math.round(
									cardInfo.current.dew_point
								)}°C`}</span>
								<span className='description__item'>{`Visibility: ${(
									Number(cardInfo.current.visibility) / 1000
								).toFixed(1)}kM`}</span>
							</div>
						</div>
					</div>
					<div className='chart__container'>
						{isDayChart ? (
							<ChartDay cardInfo={cardInfo} />
						) : (
							<ChartFiveDay cardInfo={cardInfo} />
						)}
						<button className='info__toggler' onClick={onChartToggle}>
							{isDayChart ? `For 5 days` : `For day`}
						</button>
					</div>
				</section>
			</>
		)
	)
}

export default Card
