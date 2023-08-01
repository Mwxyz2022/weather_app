export const describeWindSpeed = (speed: number): string => {
	if (speed < 6) {
		return 'wind_description_01'
	} else if (speed < 12) {
		return 'wind_description_02'
	} else if (speed < 20) {
		return 'wind_description_03'
	} else if (speed < 29) {
		return 'wind_description_04'
	} else if (speed < 39) {
		return 'wind_description_05'
	} else if (speed < 50) {
		return 'wind_description_06'
	} else if (speed < 62) {
		return 'wind_description_07'
	} else if (speed < 75) {
		return 'wind_description_08'
	} else if (speed < 89) {
		return 'wind_description_09'
	} else if (speed < 103) {
		return 'wind_description_10'
	} else if (speed < 118) {
		return 'wind_description_11'
	} else {
		return 'wind_description_12'
	}
}
