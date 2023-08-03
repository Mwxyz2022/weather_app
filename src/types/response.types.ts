interface Coord {
	lat: number
	lon: number
}
interface Temp {
	day: number
	min: number
	max: number
	night: number
	eve: number
	morn: number
}

interface WeatherDescription {
	id: number
	main: string
	description: string
	icon: string
}

interface CurrentWeather {
	dt: number
	temp: number
	feels_like: number
	pressure: number
	humidity: number
	dew_point: number
	visibility: number
	wind_speed: number
	wind_deg: number
	weather: WeatherDescription[]
	uvi: number
}

export interface HourlyWeather {
	dt: number
	temp: number
}

export interface DailyWeather {
	dt: number
	temp: Temp
}

export interface WeatherData {
	lat: number
	lon: number
	timezone: string
	timezone_offset: number
	current: CurrentWeather
	hourly: HourlyWeather[]
	daily: DailyWeather[]
}

interface Country {
	country: string
}
export interface IFindCityData {
	id: number
	name: string
	coord: Coord
	main: {
		temp: number
	}
	weather: WeatherDescription[]
	sys: Country
}

export interface ChartFormItem {
	period: string
	temp: number
}

interface AddressComponent {
	long_name: string
	short_name: string
	types: string[]
}

interface Result {
	address_components: AddressComponent[]
	place_id: string
}

export interface IGeoResponse {
	results: Result[]
}

export interface ICityData {
	id: string
	lat: number
	lon: number
	location: {
		[key: string]: string | undefined
	}
	country: {
		[key: string]: string | undefined
	}
	country_code: string | undefined
}
