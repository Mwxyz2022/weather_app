export const initFavorites = () => {
	try {
		const cities = localStorage.getItem('favorites')
		return cities ? JSON.parse(cities) : []
	} catch (error) {
		console.error('Error parsing favorite city from localStorage:', error)
		return []
	}
}
