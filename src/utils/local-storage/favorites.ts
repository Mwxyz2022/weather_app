export const initFavorites = () => {
	try {
		const cities = window.localStorage.getItem('favorites')
		return cities ? JSON.parse(cities) : []
	} catch (error) {
		return []
	}
}
