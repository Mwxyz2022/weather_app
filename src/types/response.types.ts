export interface Coord {
	lat: number
	lon: number
}

export interface City {
	id: number
	name: string
	coord: Coord
	country: string
	population: number
	timezone: number
	sunrise: number
	sunset: number
}

export interface Temp {
	day: number
	min: number
	max: number
	night: number
	eve: number
	morn: number
}

export interface FeelsLike {
	day: number
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

export interface HourlyWeather {
	dt: number
	sunrise: number
	sunset: number
	moonrise: number
	moonset: number
	moon_phase: number
	temp: number
	feels_like: FeelsLike
	pressure: number
	humidity: number
	dew_point: number
	wind_speed: number
	wind_deg: number
	wind_gust: number
	weather: WeatherDescription[]
	clouds: number
	pop: number
	uvi: number
}

export interface DailyWeather {
	dt: number
	sunrise: number
	sunset: number
	moonrise: number
	moonset: number
	moon_phase: number
	temp: Temp
	feels_like: FeelsLike
	pressure: number
	humidity: number
	dew_point: number
	wind_speed: number
	wind_deg: number
	wind_gust: number
	weather: WeatherDescription[]
	clouds: number
	pop: number
	uvi: number
}

export interface WeatherData {
	lat: number
	lon: number
	timezone: string
	timezone_offset: number
	current: DailyWeather
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
