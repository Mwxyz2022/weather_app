import { ChangeEvent, FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { AppContext } from '../../context/AppContext'
import { AppContextValue } from '../../types/types'
import { initLanguage } from '../../utils/local-storage/init-storage'

import './header.css'

const Header: FC = () => {
	const [language, setLanguage] = useState<string>(initLanguage())
	const { storedCities } = useContext<AppContextValue>(AppContext)
	const { pathname } = useLocation()
	const { t, i18n } = useTranslation()

	const isFavPage = pathname.startsWith('/favorites')

	const langHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		setLanguage(event.target.value)
		i18n.changeLanguage(event.target.value)
		localStorage.setItem('language', JSON.stringify(event.target.value))
	}

	const mainNavigate = () => {
		const firstCityTab = storedCities[0]
		return firstCityTab ? `/city/${firstCityTab.id}` : '/'
	}

	return (
		<header className='header'>
			<section className='header__container'>
				<img src={logo} alt='logo' className='logo' />
				<div className='language-container'>
					<select className='language' onChange={langHandler} value={language}>
						<option value='en'>EN</option>
						<option value='uk'>UA</option>
					</select>
				</div>
			</section>

			<nav className='navigation'>
				<Link className={isFavPage ? 'link' : 'link active'} to={mainNavigate()}>
					{t('main')}
				</Link>
				<Link className={!isFavPage ? 'link' : 'link active'} to='/favorites'>
					{t('favorites')}
				</Link>
			</nav>
		</header>
	)
}

export default Header
