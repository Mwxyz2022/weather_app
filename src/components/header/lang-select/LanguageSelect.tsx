import { FC, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { imageLang } from '../../../data/imageLang'
import { initLanguage } from '../../../utils/local-storage/init-storage'

import './language-select.css'

const LanguageSelect: FC = () => {
	const languages = ['ua', 'en']

	const [currentLang, setCurrentLang] = useState<string>(initLanguage())
	const [isShowAllLang, setIsShowAllLang] = useState(false)
	const { i18n } = useTranslation()

	const ref = useRef<HTMLButtonElement>(null)

	const onSelectLangHandler = (language: string) => {
		i18n.changeLanguage(language)
		localStorage.setItem('language', JSON.stringify(language))
		setCurrentLang(language)
		setIsShowAllLang(false)

		if (ref.current) {
			ref.current.classList.add('click')
		}
	}

	const onLangBarHandler = () => {
		setIsShowAllLang(isShowAllLang ? false : true)

		if (ref.current) {
			ref.current.classList.remove('click')
		}
	}

	return (
		<div
			className='lang__container'
			style={{
				justifyContent: isShowAllLang ? 'space-evenly' : 'center',
				width: isShowAllLang ? 106 : 56
			}}
		>
			{isShowAllLang && (
				<>
					{languages
						.filter(item => item !== currentLang)
						.map(item => (
							<button
								key={item}
								className='lang__button  lang__button-select'
								style={{
									backgroundImage: `url(${imageLang[item]})`
								}}
								onClick={() => onSelectLangHandler(item)}
							>
								<div className='button__gradient'></div>
							</button>
						))}
				</>
			)}
			<button
				ref={ref}
				className='lang__button lang__button-current'
				style={{
					backgroundImage: `url(${imageLang[currentLang]})`
				}}
				onClick={onLangBarHandler}
			>
				<div className='button__gradient'></div>
			</button>
		</div>
	)
}

export default LanguageSelect
