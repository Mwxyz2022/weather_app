import { AxiosResponse } from 'axios'

import { axiosOpenWeather, axiosOpenWeatherCityFind } from '../api/api'
import { IFindCityData, WeatherData } from '../types/response.types'

const openWeatherFindKey = process.env.REACT_APP_CITY_FIND_KEY
const openWeatherKey = process.env.REACT_APP_WEATHER_KEY

interface ICityListResponse {
	cod: string
	count: number
	list: IFindCityData[]
	message: string
}

export const WeatherService = {
	async findCityByName(cityName: string): Promise<AxiosResponse<ICityListResponse>> {
		try {
			const response = await axiosOpenWeatherCityFind.get(
				`data/2.5/find?q=${cityName}&appid=${openWeatherFindKey}&units=metric`
			)
			return response
		} catch (error: any) {
			throw new Error('Error fetching find city data: ' + error.message)
		}
	},

	async getWeatherInfo(lat: number, lon: number): Promise<AxiosResponse<WeatherData>> {
		try {
			const response = await axiosOpenWeather.get(
				`data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherKey}&units=metric`
			)
			return response
		} catch (error: any) {
			throw new Error('Error fetching weather data: ' + error.message)
		}
	}
}
