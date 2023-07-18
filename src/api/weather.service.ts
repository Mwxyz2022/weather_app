import { AxiosResponse } from 'axios'
import { api } from './api'

const appid = process.env.REACT_APP_WEATHER_KEY

export const WeatherService = {
	async findByCity(city: string): Promise<AxiosResponse> {
		try {
			return await api.get(`data/2.5/find?q=${city}&appid=${appid}&lang=uk`)
		} catch (error) {
			throw error
		}
	},
}
