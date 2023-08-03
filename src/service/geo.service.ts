import { AxiosResponse } from 'axios'

import { axiosGeocodingApi } from '../api/api'
import { IGeoResponse } from '../types/response.types'

const appGeocodingKey = process.env.REACT_APP_GEOCODING_API_KEY

export const GeoService = {
	async getCityInfo(
		lat: number,
		lon: number,
		language: string
	): Promise<AxiosResponse<IGeoResponse>> {
		try {
			const response = await axiosGeocodingApi.get(
				`json?latlng=${lat},${lon}&key=${appGeocodingKey}&language=${language}`
			)
			return response
		} catch (error: any) {
			throw new Error('Error fetching geolocation data: ' + error.message)
		}
	}
}
