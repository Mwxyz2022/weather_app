import { AxiosResponse } from 'axios'
import { geoApi } from './api'

const appid = process.env.REACT_APP_GEO_KEY

export const GeoService = {
	async getCityInfo(lat: number, lon: number): Promise<AxiosResponse> {
		try {
			return await geoApi.get(
				`geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${appid}`
			)
		} catch (error) {
			throw error
		}
	},
}
