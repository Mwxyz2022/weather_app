/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import SearchBar from './search-bar/SearchBar'

import './main.css'

const Main: FC = () => {
	const { t } = useTranslation()

	return (
		<>
			<section className='upper__container'>
				<SearchBar />
				<button style={{ marginLeft: 16 }}>{t('to_favorites')}</button>
			</section>
		</>
	)
}

export default Main
