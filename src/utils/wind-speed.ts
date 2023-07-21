export const describeWindSpeed = (speed: number): string => {
	if (speed < 6) {
		return 'Light air'
	} else if (speed < 12) {
		return 'Light breeze'
	} else if (speed < 20) {
		return 'Gentle breeze'
	} else if (speed < 29) {
		return 'Moderate breeze'
	} else if (speed < 39) {
		return 'Fresh breeze'
	} else if (speed < 50) {
		return 'Strong breeze'
	} else if (speed < 62) {
		return 'High wind, near gale'
	} else if (speed < 75) {
		return 'Gale'
	} else if (speed < 89) {
		return 'Severe gale'
	} else if (speed < 103) {
		return 'Storm'
	} else if (speed < 118) {
		return 'Violent storm'
	} else {
		return 'Hurricane'
	}
}
