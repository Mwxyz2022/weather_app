interface Coord {
	lat: number
	lon: number
}

export interface Temp {
	day: number
	min: number
	max: number
	night: number
	eve: number
	morn: number
}

export interface WeatherDescription {
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

interface HourlyWeather {
	dt: number
	temp: number
}

interface DailyWeather {
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
export interface ICityData {
	id: number
	name: string
	coord: Coord
	sys: Country
}

export interface ChartFormItem {
	period: string
	temp: number
}
