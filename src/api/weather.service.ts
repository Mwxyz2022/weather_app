import { AxiosResponse } from 'axios'

import { ICityData, WeatherData } from '../types/response.types'

import { api } from './api'

const appid = process.env.REACT_APP_WEATHER_KEY

interface ICityListResponse {
	cod: string
	count: number
	list: ICityData[]
	message: string
}

export const WeatherService = {
	async findByCity(city: string | undefined): Promise<AxiosResponse<ICityListResponse>> {
		try {
			const response = await api.get(`data/2.5/find?q=${city}&appid=${appid}&lang=en`)
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
