import { ChartFormItem, WeatherData } from '../../types/response.types'
import { getWindDirection } from '../wind-direction'
import { describeWindSpeed } from '../wind-speed'

import { transformWeatherData } from './transformWeatherData'

export interface ICardData {
	iconIndex: string
	currentTemp: number
	feelsLikeTemp: number
	currentDate: number
	timezoneOffset: number
	weatherId: number
	windSpeedDescription: string
	windDeg: number
	windSpeed: number
	windDirection: string
	pressure: number
	humidity: number
	ultraviolet: number
	dewPoint: number
	visibility: string
	hourlyData: ChartFormItem[]
	dailyData: ChartFormItem[]
}

export const getStructuredData = (weatherInfo: WeatherData): ICardData => {
	const iconIndex = weatherInfo.current.weather[0].icon
	const currentTemp = Math.round(weatherInfo.current.temp)
	const feelsLikeTemp = Math.round(weatherInfo.current.feels_like)
	const currentDate = weatherInfo.current.dt
	const timezoneOffset = weatherInfo.timezone_offset
	const weatherId = weatherInfo.current.weather[0].id
	const windSpeedDescription = describeWindSpeed(weatherInfo.current.wind_speed)
	const windDeg = weatherInfo.current.wind_deg
	const windSpeed = Math.round(weatherInfo.current.wind_speed * 10) / 10
	const windDirection = getWindDirection(weatherInfo.current.wind_deg)
	const pressure = weatherInfo.current.pressure
	const humidity = weatherInfo.current.humidity
	const ultraviolet = Math.round(weatherInfo.current.uvi)
	const dewPoint = Math.round(weatherInfo.current.dew_point)
	const visibility = (Number(weatherInfo.current.visibility) / 1000).toFixed(1)

	const { hourly: hourlyData, daily: dailyData } = transformWeatherData(weatherInfo)

	return {
		iconIndex,
		currentTemp,
		feelsLikeTemp,
		currentDate,
		timezoneOffset,
		weatherId,
		windSpeedDescription,
		windDeg,
		windSpeed,
		windDirection,
		pressure,
		humidity,
		ultraviolet,
		dewPoint,
		visibility,
		hourlyData,
		dailyData
	}
}
