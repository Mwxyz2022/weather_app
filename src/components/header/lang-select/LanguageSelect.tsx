import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import enFlag from '../../../assets/img/lang-flag/en.png'
import uaFlag from '../../../assets/img/lang-flag/ua.png'
import { initLanguage } from '../../../utils/local-storage/init-storage'

import './language-select.css'

interface ILangUrl {
	[key: string]: string
}

const langImage: ILangUrl = {
	ua: uaFlag,
	en: enFlag
}
const LanguageSelect: FC = () => {
	const languages = ['ua', 'en']

	const [currentLang, setCurrentLang] = useState<string>(initLanguage())
	const [isShowAllLang, setIsShowAllLang] = useState(false)
	const { i18n } = useTranslation()

	const onSelectLangHandler = (language: string) => {
		i18n.changeLanguage(language)
		localStorage.setItem('language', JSON.stringify(language))
		setIsShowAllLang(false)
		setCurrentLang(language)
	}

	return (
		<div
			className='lang__container'
			onMouseEnter={() => setIsShowAllLang(true)}
			onMouseLeave={() => setIsShowAllLang(false)}
		>
			{isShowAllLang && (
				<>
					{languages
						.filter(item => item !== currentLang)
						.map(item => (
							<button
								className='lang__button select-lang'
								style={{
									backgroundImage: `url(${langImage[item]})`
								}}
								onClick={() => onSelectLangHandler(item)}
							>
								<div className='button__gradient'></div>
							</button>
						))}
				</>
			)}
			<button
				className='lang__button current-lang'
				style={{
					backgroundImage: `url(${langImage[currentLang]})`
				}}
			>
				<div className='button__gradient'></div>
			</button>
		</div>
	)
}

export default LanguageSelect
