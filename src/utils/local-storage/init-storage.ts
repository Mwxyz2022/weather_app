import { ICityData } from '../../types/response.types'

export const initCities = (): ICityData[] => {
	try {
		const cities = localStorage.getItem('cities')
		return cities ? JSON.parse(cities) : []
	} catch (error) {
		console.error('Error parsing  city from localStorage:', error)
		return []
	}
}

export const initFavorites = (): ICityData[] => {
	try {
		const cities = localStorage.getItem('favorites')
		return cities ? JSON.parse(cities) : []
	} catch (error) {
		console.error('Error parsing favorite cities from localStorage:', error)
		return []
	}
}

export const initLanguage = (): string => {
	try {
		const language = localStorage.getItem('language')
		return language ? JSON.parse(language) : 'uk'
	} catch (error) {
		console.error('Error parsing language from localStorage:', error)
		return 'ua'
	}
}
