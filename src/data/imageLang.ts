import enFlag from '../assets/img/lang-flag/en.png'
import ukFlag from '../assets/img/lang-flag/uk.png'

interface ILangUrl {
	[key: string]: string
}

export const imageLang: ILangUrl = {
	uk: ukFlag,
	en: enFlag
}
