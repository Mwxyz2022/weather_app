import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { imageLang } from '../../../data/imageLang'
import { initLanguage } from '../../../utils/local-storage/init-storage'

import './language-select.css'

const LanguageSelect: FC = () => {
	const languages = ['uk', 'en']

	const [currentLang, setCurrentLang] = useState<string>(initLanguage())
	const [isShowAllLang, setIsShowAllLang] = useState(false)
	const { i18n } = useTranslation()

	const currentBtnRef = useRef<HTMLButtonElement>(null)

	const onSelectLangHandler = (language: string) => {
		i18n.changeLanguage(language)
		localStorage.setItem('language', JSON.stringify(language))
		setCurrentLang(language)
		setIsShowAllLang(false)
	}

	const onLangBarHandler = () => {
		setIsShowAllLang(prev => !prev)
	}

	useEffect(() => {
		if (currentBtnRef.current) {
			if (isShowAllLang) {
				currentBtnRef.current.classList.remove('click')
			} else {
				currentBtnRef.current.classList.add('click')
			}
		}
	}, [isShowAllLang])

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
								style={{
									backgroundImage: `url(${imageLang[item]})`
								}}
								className='button__lang button__lang-item'
								onClick={() => onSelectLangHandler(item)}
							/>
						))}
				</>
			)}

			<button
				ref={currentBtnRef}
				style={{
					backgroundImage: `url(${imageLang[currentLang]})`
				}}
				className='button__lang'
				onClick={onLangBarHandler}
			/>
		</div>
	)
}

export default LanguageSelect

// import { FC, MouseEvent, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'

// import { imageLang } from '../../../data/imageLang'
// import { initLanguage } from '../../../utils/local-storage/init-storage'

// import './language-select.css'

// const LanguageSelect: FC = () => {
// 	const languages = ['ua', 'en']

// 	const [currentLang, setCurrentLang] = useState<string>(initLanguage())
// 	const [isShowAllLang, setIsShowAllLang] = useState(false)
// 	const { i18n } = useTranslation()

// 	const currentBtnRef = useRef<HTMLButtonElement>(null)

// 	const onSelectLangHandler = (language: string) => {
// 		i18n.changeLanguage(language)
// 		localStorage.setItem('language', JSON.stringify(language))
// 		setCurrentLang(language)
// 		setIsShowAllLang(false)

// 		if (currentBtnRef.current) {
// 			currentBtnRef.current.classList.remove('click')
// 		}
// 	}

// 	const onLangBarHandler = () => {
// 		setIsShowAllLang(prev => !prev)

// 		if (currentBtnRef.current && isShowAllLang) {
// 			currentBtnRef.current.classList.remove('click')
// 		}
// 	}

// 	const onMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
// 		const isCurrentButton = e.currentTarget.getAttribute('data-name') || ''

// 		if (currentBtnRef.current) {
// 			currentBtnRef.current.classList.add('click')
// 		}

// 		if (isCurrentButton === 'current') {
// 			onLangBarHandler()
// 		} else {
// 			onSelectLangHandler(isCurrentButton)
// 		}
// 	}

// 	return (
// 		<div
// 			className='lang__container'
// 			style={{
// 				justifyContent: isShowAllLang ? 'space-evenly' : 'center',
// 				width: isShowAllLang ? 106 : 56
// 			}}
// 		>
// 			{isShowAllLang && (
// 				<>
// 					{languages
// 						.filter(item => item !== currentLang)
// 						.map(item => (
// 							<button
// 								key={item}
// 								data-name={item}
// 								style={{
// 									backgroundImage: `url(${imageLang[item]})`
// 								}}
// 								className='button__lang button__lang-select'
// 								onClick={onMouseUp}
// 							/>
// 						))}
// 				</>
// 			)}

// 			<button
// 				ref={currentBtnRef}
// 				data-name='current'
// 				style={{
// 					backgroundImage: `url(${imageLang[currentLang]})`
// 				}}
// 				className='button__lang'
// 				onClick={onMouseUp}
// 			/>
// 		</div>
// 	)
// }

// export default LanguageSelect
