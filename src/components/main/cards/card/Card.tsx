/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineClose } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

import arrow from '../../../../assets/img/arrow.svg'
import pressureSVG from '../../../../assets/img/pressure.svg'
import { AppContext } from '../../../../context/AppContext'
import iconWeather from '../../../../data/imageWeather'
import { weatherDescriptionCode } from '../../../../data/weatherDescription'
import { WeatherService } from '../../../../service/weather.service'
import { ICityData } from '../../../../types/response.types'
import { AppContextValue } from '../../../../types/types'
import { formatTime } from '../../../../utils/format-time'
import { ICardData, getStructuredData } from '../../../../utils/parse-data/parse-data'
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

	const [cardData, setCardData] = useState<ICardData | null>(null)
	const { pathname } = useLocation()
	const { t, i18n } = useTranslation()
	const language = i18n.language

	const isCityPage = pathname.startsWith('/city/')

	const { id: cityId } = initData
	const { lat, lon } = initData

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
										src={iconWeather[cardData.iconIndex]}
										alt='weather icon'
										style={{ maxWidth: 100, minHeight: 100, width: '100%', height: '100%' }}
									/>
									<span className='temperature__value'>{`${cardData.currentTemp}°C`}</span>
								</div>

								{isCityPage && (
									<div className='data__location'>
										<p>
											{initData.location[language]}, {initData.country[language]}
										</p>
										<img
											className='location__icon'
											src={`https://flagicons.lipis.dev/flags/4x3/${initData.country_code}.svg`}
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
							<time className='data__date'>
								{formatTime(cardData.currentDate, cardData.timezoneOffset, i18n.language)}
							</time>
							<p className='details__feels'>
								{t('card_feels_like', { feelsLikeTemp: cardData.feelsLikeTemp })}{' '}
								{t(weatherDescriptionCode[cardData.weatherId])} {t(cardData.windSpeedDescription)}
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
									<span className='wind__info'>
										{t('card_wind_speed', { windSpeed: cardData.windSpeed })}{' '}
										{t(cardData.windDirection)}
									</span>
								</div>
								<div className='description__pressure'>
									<img src={pressureSVG} alt='pressure' className='pressure__icon' />
									<span className='pressure__info'>
										{t('card_pressure', { pressure: cardData.pressure })}
									</span>
								</div>
							</div>

							<div className='details__description'>
								<span className='description__item'>
									{t('card_humidity', { humidity: cardData.humidity })}
								</span>
								<span className='description__item'>{`${t('card_ultraviolet')} ${
									cardData.ultraviolet
								}`}</span>
							</div>

							<div className='details__description'>
								<span className='description__item'>
									{t('card_dev_point', { devPoint: cardData.dewPoint })}
								</span>
								<span className='description__item'>
									{t('card_visibility', { visibility: cardData.visibility })}
								</span>
							</div>
						</div>
					</div>
					<div className='chart__container'>
						{isDayChart ? (
							<ChartDay hourlyData={cardData.hourlyData} timezoneOffset={cardData.timezoneOffset} />
						) : (
							<ChartFiveDay
								dailyData={cardData.dailyData}
								timezoneOffset={cardData.timezoneOffset}
							/>
						)}
						<button className='chart__button' onClick={onChartHandler}>
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
