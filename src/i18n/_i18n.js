import i18next from 'i18next'

import { initLanguage } from '../utils/local-storage/init-language'
import common_en from './en.json'
import common_uk from './uk.json'

const i18n = i18next.createInstance(
	{
		lng: initLanguage(),
		fallbackLng: 'en',
		ns: ['common'],
		defaultNS: 'common',
		react: { useSuspense: false },
		interpolation: { escapeValue: false },
		resources: {
			en: {
				common: common_en
			},
			uk: {
				common: common_uk
			}
		}
	},

	err => {
		if (err) return console.log(err)
	}
)

export default i18n
