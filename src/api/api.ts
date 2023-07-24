import axios from 'axios'

const axiosOptions = {
	baseURL: process.env.REACT_APP_WEATHER_URL,
}

export const api = axios.create(axiosOptions)

const axiosGeoOptions = {
	baseURL: process.env.REACT_APP_GEO_URL,
}

export const geoApi = axios.create(axiosGeoOptions)
