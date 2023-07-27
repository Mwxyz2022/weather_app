import { FC, MouseEvent, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { imageLang } from '../../../data/imageLang'
import { initLanguage } from '../../../utils/local-storage/init-storage'

import './language-select.css'

const LanguageSelect: FC = () => {
	const languages = ['ua', 'en']

	const [currentLang, setCurrentLang] = useState<string>(initLanguage())
	const [isShowAllLang, setIsShowAllLang] = useState(false)
	const { i18n } = useTranslation()

	const ref = useRef<HTMLDivElement>(null)

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
									onMouseDown={onMouseDown}
									onMouseUp={onMouseUp}
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
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}
				/>
			</div>
		</div>
	)
}

export default LanguageSelect
