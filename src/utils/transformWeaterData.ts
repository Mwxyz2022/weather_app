import moment from 'moment'
import { WeatherData } from '../types/response-types'

export interface ChartFormItem {
	period: string
	temp: number
}

interface ChartFormData {
	hourly: ChartFormItem[]
	daily: ChartFormItem[]
}

const getPeriod = (
	timestamp: number,
	timezone: number,
	format: string
): string => {
	return moment
		.unix(timestamp)
		.utcOffset(timezone / 60)
		.format(format)
}

export const transformWeatherData = (data: WeatherData): ChartFormData => {
	return {
		hourly: data.hourly.slice(0, 24).map(item => ({
			period: getPeriod(item.dt, data.timezone_offset, 'hh A'),
			temp: Math.floor(item.temp),
		})),
		daily: data.daily.slice(0, 5).map(item => ({
			period: getPeriod(item.dt, data.timezone_offset, 'ddd DD MMM'),
			temp: Math.floor((item.temp.max + item.temp.min) / 2),
		})),
	}
}
