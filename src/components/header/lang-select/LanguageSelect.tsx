import { FC, MouseEvent, TouchEvent, useRef, useState } from 'react'
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

	const startTouchTimestampRef = useRef<number>(0)

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

	const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
		startTouchTimestampRef.current = e.timeStamp
	}

	const onMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
		const isClick = startTouchTimestampRef.current - e.timeStamp < 500
		const isCurrentButton = e.currentTarget.getAttribute('data-name') || ''

		if (isClick) {
			if (isCurrentButton === 'current') {
				onLangBarHandler()
			} else {
				onSelectLangHandler(isCurrentButton)
			}
		}
	}

	const onTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
		startTouchTimestampRef.current = e.timeStamp
	}

	const onTouchEnd = (e: TouchEvent<HTMLButtonElement>) => {
		const isClick = startTouchTimestampRef.current - e.timeStamp < 500
		const isCurrentButton = e.currentTarget.getAttribute('data-name') || ''

		if (isClick) {
			if (isCurrentButton === 'current') {
				onLangBarHandler()
			} else {
				onSelectLangHandler(isCurrentButton)
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
							<button
								key={item}
								data-name={item}
								style={{
									backgroundImage: `url(${imageLang[item]})`
								}}
								className='button__lang button__lang-select'
								onMouseDown={onMouseDown}
								onMouseUp={onMouseUp}
								onTouchStart={onTouchStart}
								onTouchEnd={onTouchEnd}
							/>
						))}
				</>
			)}

			<button
				ref={ref}
				data-name='current'
				style={{
					backgroundImage: `url(${imageLang[currentLang]})`
				}}
				className='button__lang button__lang-current'
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onTouchStart={onTouchStart}
				onTouchEnd={onTouchEnd}
			/>
		</div>
	)
}

export default LanguageSelect
