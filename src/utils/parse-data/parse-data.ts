import moment from 'moment'
import { degToCompass } from '../deg-compass'
import { transformWeatherData } from '../transformWeaterData'
import { describeWindSpeed } from '../wind-speed'

export const getStructuredData = (weatherInfo: any) => {
	const iconIndex = weatherInfo.current.weather[0].icon
	const currentTemp = Math.round(weatherInfo.current.temp)
	const feelsLikeTemp = Math.round(weatherInfo.current.feels_like)

	let descriptionWeather = weatherInfo.current.weather[0].description
	descriptionWeather =
		descriptionWeather.charAt(0).toUpperCase() + descriptionWeather.slice(1)

	const localTime = moment
		.unix(weatherInfo.current.dt)
		.utcOffset(weatherInfo.timezone_offset / 60)
		.format('MMM DD, h:mmA')

	const windSpeedString = describeWindSpeed(weatherInfo.current.wind_speed)
	const windDeg = weatherInfo.current.wind_deg
	const windSpeed = Math.round(weatherInfo.current.wind_speed * 10) / 10
	const windCompassString = degToCompass(weatherInfo.current.wind_deg)
	const pressure = weatherInfo.current.pressure
	const humidity = weatherInfo.current.humidity
	const ultraviolet = Math.round(weatherInfo.current.uvi)
	const dewPoint = Math.round(weatherInfo.current.dew_point)
	const visibility = (Number(weatherInfo.current.visibility) / 1000).toFixed(1)

	const { hourly: hourlyData, daily: dailyData } =
		transformWeatherData(weatherInfo)

	return {
		iconIndex,
		currentTemp,
		feelsLikeTemp,
		descriptionWeather,
		localTime,
		windSpeedString,
		windDeg,
		windSpeed,
		windCompassString,
		pressure,
		humidity,
		ultraviolet,
		dewPoint,
		visibility,
		hourlyData,
		dailyData
	}
}
