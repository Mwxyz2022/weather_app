import moment from 'moment'
import 'moment/locale/uk'

export const formatTime = (
	currentDate: number,
	timezoneOffset: number,
	language: string
): string => {
	const localTime = moment
		.unix(currentDate)
		.utcOffset(timezoneOffset / 60)
		.locale(language === 'ua' ? 'ua' : 'en')
		.format(language === 'ua' ? 'D MMM, H:mm' : 'MMM D, h:mmA')

	return localTime
}
