import { FC, TouchEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { imageLang } from '../../../data/imageLang'
import { initLanguage } from '../../../utils/local-storage/init-storage'

import './language-select.css'

const LanguageSelect: FC = () => {
	const languages = ['ua', 'en']

	const [touchStart, setTouchStart] = useState(0)
	const [currentLang, setCurrentLang] = useState<string>(initLanguage())
	const [isShowAllLang, setIsShowAllLang] = useState(false)
	const { i18n } = useTranslation()

	const ref = useRef<HTMLDivElement>(null)

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

	const onTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
		setTouchStart(e.timeStamp)
	}

	const onTouchEnd = (e: TouchEvent<HTMLButtonElement>) => {
		const touchEnd = e.timeStamp
		console.log(e.currentTarget.dataset.name)

		const isClick = touchEnd - touchStart < 300

		const buttonName = e.currentTarget.dataset.name || ''

		if (isClick) {
			if (buttonName === 'current') {
				onLangBarHandler()
			} else {
				onSelectLangHandler(buttonName)
			}
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
							<div
								key={item}
								className='button__wrapper button__wrapper-select'
								style={{
									backgroundImage: `url(${imageLang[item]})`
								}}
							>
								<button
									data-name={item}
									className='button__gradient'
									onClick={() => onSelectLangHandler(item)}
									onTouchStart={onTouchStart}
									onTouchEnd={onTouchEnd}
								/>
							</div>
						))}
				</>
			)}
			<div
				ref={ref}
				className='button__wrapper button__wrapper-current'
				style={{
					backgroundImage: `url(${imageLang[currentLang]})`
				}}
			>
				<button
					className='button__gradient'
					data-name='current'
					onClick={onLangBarHandler}
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				/>
			</div>
		</div>
	)
}

export default LanguageSelect
