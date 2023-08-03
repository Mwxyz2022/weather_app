import { GeoService } from '../service/geo.service'
import { ICityData } from '../types/response.types'

export const getCityInfoByLang = async (lat: number, lon: number, language: string) => {
	try {
		const { data } = await GeoService.getCityInfo(lat, lon, language)
		return data
	} catch (error) {
		console.error(error)
	}
}

export const getCityAllInfo = async (
	lat: number,
	lon: number,
	languages: string[]
): Promise<ICityData> => {
	let cityFullInfo: ICityData = {} as ICityData

	for (const language of languages) {
		const info = await getCityInfoByLang(lat, lon, language)

		if (!info) break

		const id = info.results[0].place_id
		const addressComponentsFirst = info.results[5].address_components
		const addressComponentsNext = info.results[0].address_components

		const location = {
			...cityFullInfo.location,
			[language]:
				addressComponentsFirst.find(
					component =>
						component.types.includes('locality') ||
						component.types.includes('administrative_area_level_3') ||
						component.types.includes('administrative_area_level_1')
				)?.long_name ||
				addressComponentsNext.find(
					component =>
						component.types.includes('locality') ||
						component.types.includes('administrative_area_level_3') ||
						component.types.includes('administrative_area_level_1')
				)?.long_name
		}

		const country = {
			...cityFullInfo.country,
			[language]: addressComponentsFirst.find(component => component.types.includes('country'))
				?.long_name
		}

		const country_code = addressComponentsFirst
			.find(component => component.types.includes('country'))
			?.short_name.toLowerCase()

		cityFullInfo = {
			id,
			lat,
			lon,
			location,
			country,
			country_code
		}
	}

	return cityFullInfo
}
