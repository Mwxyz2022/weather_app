import { ChangeEvent, FC, useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/logo.png'

import './header.css'

import { useTranslation } from 'react-i18next'
import { AppContext } from '../../context/AppContext'

const Header: FC = () => {
	const { t, i18n } = useTranslation()
	const { pathname } = useLocation()
	const { storedCities } = useContext(AppContext)
	const firstCityTab = storedCities[0]
	const cityTabId = firstCityTab?.id

	const isFavPage = pathname.split('/')[1] === 'favorites'

	const [language, setLanguage] = useState<string>('uk')

	const langHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		setLanguage(event.target.value)
		i18n.changeLanguage(event.target.value)
	}

	return (
		<header className='header'>
			<section className='header__container'>
				<img src={logo} alt='logo' className='logo' />

				<select className='language' onChange={langHandler} value={language}>
					<option value='en'>EN</option>
					<option value='uk'>UA</option>
				</select>
			</section>

			<nav className='navigation'>
				<Link
					className={isFavPage ? 'link' : 'link active'}
					to={cityTabId ? `/city/${cityTabId}` : '/'}
				>
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
