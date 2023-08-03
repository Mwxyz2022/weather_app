import { ResourceLanguage } from 'i18next'

import { ICityData } from './response.types'

export interface AppContextValue {
	storedCities: ICityData[]
	setStoredCities: (cities: ICityData[]) => void
	favoriteCities: ICityData[]
	setFavoriteCities: (cities: ICityData[]) => void
}

export type ResourcesType = {
	[key: string]: ResourceLanguage
}
