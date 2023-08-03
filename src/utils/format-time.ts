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
		.locale(language === 'uk' ? 'uk' : 'en')
		.format(language === 'uk' ? 'd MMM, H:mm' : 'MMM D, h:mmA')

	return localTime
}
