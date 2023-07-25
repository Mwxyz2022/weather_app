import { useEffect, useState } from 'react'

interface PositionError {
	code: number
	message: string
}

interface Coords {
	lat: number
	lon: number
}

interface LocationState {
	loaded: boolean
	coordinates: Coords
	error?: PositionError
}

export const useGeolocation = () => {
	const [location, setLocation] = useState<LocationState>({
		loaded: false,
		// default coordinates in case tracking coordinates do not agree
		coordinates: { lat: 46.6558, lon: 32.6178 }
	})

	const onSuccess = (location: GeolocationPosition) => {
		setLocation({
			loaded: true,
			coordinates: {
				lat: location.coords.latitude,
				lon: location.coords.longitude
			}
		})
	}

	const onError = (error: PositionError) => {
		setLocation({
			loaded: true,
			error,
			coordinates: { lat: 46.6558, lon: 32.6178 }
		})
	}

	useEffect(() => {
		if (!('geolocation' in navigator)) {
			onError({
				code: 0,
				message: 'Geolocation not supported'
			})
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError)
	}, [])

	return location
}
