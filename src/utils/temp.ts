export const tempConvert = (kelvinTemp: number, deg: string = 'C') => {
	if (deg === 'F') {
		const fahrenheitTemp = ((kelvinTemp - 273.15) * 9) / 5 + 32
		return Math.round(fahrenheitTemp)
	}

	const celsiusTemp = kelvinTemp - 273.15

	return Math.round(celsiusTemp)
}
