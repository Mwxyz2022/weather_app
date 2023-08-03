import axios from 'axios'

const apiOpenWeatherOptions = {
	baseURL: process.env.REACT_APP_CITY_FIND_URL
}
export const axiosOpenWeatherCityFind = axios.create(apiOpenWeatherOptions)

const openWeatherOptions = {
	baseURL: process.env.REACT_APP_WEATHER_URL
}
export const axiosOpenWeather = axios.create(openWeatherOptions)

const geocodingApi = {
	baseURL: process.env.REACT_APP_GEOCODING_API_URL
}
export const axiosGeocodingApi = axios.create(geocodingApi)
