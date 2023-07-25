import { ICityData } from '../../types/response.types'

export const initCities = (): ICityData[] => {
	try {
		const cities = localStorage.getItem('cities')
		return cities ? JSON.parse(cities) : []
	} catch (error) {
		return []
	}
}
