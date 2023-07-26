import enFlag from '../assets/img/lang-flag/en.png'
import uaFlag from '../assets/img/lang-flag/ua.png'

interface ILangUrl {
	[key: string]: string
}

export const imageLang: ILangUrl = {
	ua: uaFlag,
	en: enFlag
}
