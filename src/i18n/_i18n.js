import i18next from 'i18next'

import common_en from './en.json'
import common_ua from './ua.json'

const i18n = i18next.createInstance(
	{
		lng: 'ua',
		fallbackLng: 'en',
		ns: ['common'],
		defaultNS: 'common',
		react: { useSuspense: false },
		interpolation: { escapeValue: false },
		resources: {
			en: {
				common: common_en,
			},
			ua: {
				common: common_ua,
			},
		},
	},

	err => {
		if (err) return console.log(err)
	}
)

export default i18n
