import axios from 'axios'

const axiosOptions = {
	baseURL: process.env.REACT_APP_WEATHER_URL,
}

export const api = axios.create(axiosOptions)
