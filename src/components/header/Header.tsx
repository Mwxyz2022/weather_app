import { ChangeEvent, FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/logo.png'

import './header.css'

import { useTranslation } from 'react-i18next'

const Header: FC = () => {
	const { t, i18n } = useTranslation()

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
				<NavLink
					className={({ isActive }) => (isActive ? 'link active' : 'link')}
					to='/'
				>
					{t('main')}
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? 'link active' : 'link')}
					to='/favorites'
				>
					{t('favorites')}
				</NavLink>
			</nav>
		</header>
	)
}

export default Header
