import { GeoService } from '../service/geo.service'
import { WeatherService } from '../service/weather.service'
import { ICityData } from '../types/response.types'

export const getCityName = async (lat: number, lon: number): Promise<string | undefined> => {
	try {
		const response = await GeoService.getCityInfo(lat, lon)
		if (response.data.length > 0) {
			const cityName = response.data[0].name
			return cityName
		}
	} catch (error) {
		console.error(error)
	}
}

export const findCityWithName = async (
	name: string | undefined
): Promise<ICityData[] | undefined> => {
	try {
		const { data } = await WeatherService.findByCity(name)
		return data.list
	} catch (error) {
		console.error(error)
	}
}
