export const getWindDirection = (deg: number): string => {
	const val = Math.floor(deg / 22.5 + 0.5)
	const arr = [
		'wind_direction_n',
		'wind_direction_nne',
		'wind_direction_ne',
		'wind_direction_ene',
		'wind_direction_e',
		'wind_direction_ese',
		'wind_direction_se',
		'wind_direction_sse',
		'wind_direction_s',
		'wind_direction_ssw',
		'wind_direction_sw',
		'wind_direction_wsw',
		'wind_direction_w',
		'wind_direction_wnw',
		'wind_direction_nw',
		'wind_direction_nnw'
	]
	return arr[val % 16]
}
