import { FC, useContext } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import FavoriteItem from './favorite-item/FavoriteItem'
import './favorites.css'

const Favorites: FC = () => {
	const { favoriteCities } = useContext(AppContext)
	const { t } = useTranslation()
	const isFavoritesEmpty = !favoriteCities || !favoriteCities.length

	return (
		<>
			{!!favoriteCities.length &&
				favoriteCities.map((city: any) => {
					return <FavoriteItem key={city.id} cityData={city} />
				})}

			{isFavoritesEmpty && (
				<div className='no-cities'>
					<h1 className='no-cities__title'>{t('no_city_list_title')}</h1>
					<p className='no-cities__description'>
						{t('no_city_list_description')}
					</p>
					<ol className='no-cities__list'>
						<li className='no-cities__list-item'>
							<Link className='no-cities__link' to='/'>
								{t('no_city_list_item_link')}asdsadasfda
							</Link>
						</li>
						<li className='no-cities__list-item'>
							{t('no_city_list_item_choose_city')}
						</li>
						<li className='no-cities__list-item'>
							{t('no_city_list_item_click_star')}
						</li>
					</ol>
				</div>
			)}
		</>
	)
}

export default Favorites
