import { AxiosResponse } from 'axios'

import { api, geoApi } from '../api/api'
import { ICityData, WeatherData } from '../types/response.types'

const appid = process.env.REACT_APP_WEATHER_KEY

const myAppId = process.env.REACT_APP_MY_KEY

interface ICityListResponse {
	cod: string
	count: number
	list: ICityData[]
	message: string
}

export const WeatherService = {
	async findByCity(city: string | undefined): Promise<AxiosResponse<ICityListResponse>> {
		try {
			const response = await geoApi.get(`data/2.5/find?q=${city}&appid=${myAppId}&units=metric`)
			return response
		} catch (error: any) {
			throw new Error('Error fetching find city data: ' + error.message)
		}
	},

	async getWeatherInfo(lat: number, lon: number): Promise<AxiosResponse<WeatherData>> {
		try {
			const response = await api.get(
				`data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${appid}&lang=uk`
			)
			return response
		} catch (error: any) {
			throw new Error('Error fetching weather data: ' + error.message)
		}
	}
}
