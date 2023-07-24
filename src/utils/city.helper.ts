import { GeoService } from '../api/geo.service'
import { WeatherService } from '../api/weather.service'

export const getCityName = async (lat: number, lon: number) => {
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

export const findCityWithName = async (name: string) => {
	try {
		const { data } = await WeatherService.findByCity(name)
		return data
	} catch (error) {
		console.error(error)
	}
}

export const putToStorage = async (closestCity: any, storeKey: string) => {
	try {
		window.localStorage.setItem(storeKey, JSON.stringify(closestCity))
	} catch (error) {
		console.error(error)
	}
}
