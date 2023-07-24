export const initCities = () => {
	try {
		const cities = window.localStorage.getItem('cities')
		return cities ? JSON.parse(cities) : []
	} catch (error) {
		return []
	}
}

export const initCardInfo = (cityId: string) => {
	try {
		const cities = window.localStorage.getItem('cities')
		if (cities) {
			const cityInfo = JSON.parse(cities).find(
				(city: any) => city.id.toString() === cityId
			)
			return cityInfo
		}
		return null
	} catch (error) {
		return null
	}
}
