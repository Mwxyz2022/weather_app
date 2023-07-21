import { ChangeEvent, FC, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/logo.png'

import './header.css'

import { useTranslation } from 'react-i18next'

const Header: FC = () => {
	const { t, i18n } = useTranslation()
	const { pathname } = useLocation()

	const isFavPage = pathname.split('/')[1] === 'favorites'

	const [language, setLanguage] = useState<string>('ua')

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
					<option value='ua'>UA</option>
				</select>
			</section>

			<nav className='navigation'>
				<Link className={isFavPage ? 'link' : 'link active'} to='/'>
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
