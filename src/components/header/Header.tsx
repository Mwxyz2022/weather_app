import { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/logo.png'
import { AppContext } from '../../context/AppContext'
import { AppContextValue } from '../../types/types'

import './header.css'
import LanguageSelect from './lang-select/LanguageSelect'

const Header: FC = () => {
	const { storedCities } = useContext<AppContextValue>(AppContext)
	const { pathname } = useLocation()
	const { t } = useTranslation()

	const isFavPage = pathname.startsWith('/favorites')

	const mainNavigate = () => {
		const firstCityTab = storedCities[0]
		return firstCityTab ? `/city/${firstCityTab.id}` : '/'
	}

	return (
		<header className='header'>
			<section className='header__container'>
				<img src={logo} alt='logo' className='logo' />
				<LanguageSelect />
			</section>

			<nav className='navigation__page'>
				<div className='links__wrapper'>
					<Link className={isFavPage ? 'link__page' : 'link__page selected'} to={mainNavigate()}>
						<span>{t('main')}</span>
					</Link>
					<Link className={!isFavPage ? 'link__page' : 'link__page selected'} to='/favorites'>
						{t('favorites')}
					</Link>
				</div>
			</nav>
		</header>
	)
}

export default Header
