import { ICityData } from '../types/response.types'

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
	const radlat1 = (Math.PI * lat1) / 180
	const radlat2 = (Math.PI * lat2) / 180
	const theta = lon1 - lon2
	const radtheta = (Math.PI * theta) / 180
	let dist =
		Math.sin(radlat1) * Math.sin(radlat2) +
		Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
	dist = Math.acos(dist)
	dist = (dist * 180) / Math.PI
	dist = dist * 60 * 1.1515
	return dist
}

export const findClosestCity = (cities: ICityData[] | undefined, lat: number, lon: number) => {
	if (!cities || cities.length === 0) {
		return
	}

	let closestCity = cities[0]
	let closestDistance = getDistance(lat, lon, cities[0].coord.lat, cities[0].coord.lon)

	for (let city of cities) {
		const distance = getDistance(lat, lon, city.coord.lat, city.coord.lon)
		if (distance < closestDistance) {
			closestCity = city
			closestDistance = distance
		}
	}

	return closestCity
}
