/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineClose } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

import arrow from '../../../../assets/img/arrow.svg'
import pressure from '../../../../assets/img/pressure.svg'
import { AppContext } from '../../../../context/AppContext'
import { WeatherService } from '../../../../service/weather.service'
import { ICityData } from '../../../../types/response.types'
import { AppContextValue } from '../../../../types/types'
import { getStructuredData } from '../../../../utils/parse-data/parse-data'
import Loader from '../../../loader/Loader'
import ModalPortal from '../../../modal/ModalPortal'
import ModalDeleteCity from '../../../modal/delete-city/ModalDeleteCity'
import ChartDay from '../chart-day/ChartDay'
import ChartFiveDay from '../chart-day/ChartFiveDay'

import './card.css'
import FavoriteButton from './favorite-button/FavoriteButton'

interface ICardProps {
	initData: ICityData
}

const Card: FC<ICardProps> = ({ initData }) => {
	const { storedCities } = useContext<AppContextValue>(AppContext)
	const [cardLoader, setCardLoader] = useState<boolean>(true)
	const [isDayChart, setIsDayChart] = useState<boolean>(true)
	const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false)

	const [cardData, setCardData] = useState<any>(null)
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
			const { data: weatherInfo } = await WeatherService.getWeatherInfo(lat, lon)

			const cardData = getStructuredData(weatherInfo)

			setCardData(cardData)
		} catch (error) {
			console.error(error)
		} finally {
			setCardLoader(false)
		}
	}

	useEffect(() => {
		getWeatherInfo()
	}, [initData])

	if (cardLoader) {
		return <Loader />
	}

	return (
		<>
			{cardData && (
				<section className='card'>
					<div className='card__info'>
						<div className='info'>
							<div className='info__data'>
								<div className='temperature'>
									<img
										className='temperature__icon'
										src={`https://openweathermap.org/img/wn/${cardData.iconIndex}@2x.png`}
										alt='weather icon'
										style={{ maxWidth: 100, minHeight: 100, width: '100%', height: '100%' }}
									/>
									<span className='temperature__value'>{`${cardData.currentTemp}°C`}</span>
								</div>

								{isCityPage && (
									<div className='data__location'>
										<p>
											{initData.name}, {initData.sys.country}
										</p>
										<img
											className='location--icon'
											src={`https://flagicons.lipis.dev/flags/4x3/${initData.sys.country.toLowerCase()}.svg`}
											alt='flag'
										/>
									</div>
								)}
							</div>

							{isCityPage && (
								<div className='actions'>
									<FavoriteButton cityId={cityId} />
									{storedCities.length > 1 && (
										<button className='button__favorite' onClick={() => setIsShowDeleteModal(true)}>
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
			)}

			{isShowDeleteModal && (
				<ModalPortal>
					<ModalDeleteCity setIsShowDeleteModal={setIsShowDeleteModal} />
				</ModalPortal>
			)}
		</>
	)
}

export default Card
