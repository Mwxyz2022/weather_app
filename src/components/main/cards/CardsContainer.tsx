import { FC, useContext } from 'react'
import { AiTwotoneStar } from 'react-icons/ai'
import { Link, Outlet, useParams } from 'react-router-dom'

import { AppContext } from '../../../context/AppContext'
import { AppContextValue } from '../../../types/types'

import './cards-container.css'

const CardsContainer: FC = () => {
	const { storedCities, favoriteCities } = useContext<AppContextValue>(AppContext)
	const { cityId } = useParams()

	return (
		<section className='cards__container'>
			<ul className='city-nav'>
				{!!storedCities.length &&
					storedCities.map((city: any) => {
						const isActive = cityId === `${city.id}`

						const isFavoriteCity = favoriteCities.some(favCity => favCity.id === city.id)
						return (
							<li
								className={isActive ? 'city-nav-item link-active' : 'city-nav-item'}
								key={city.id}
							>
								<Link className='city-link' to={`/city/${city.id}`}>
									{city.name}
									{isFavoriteCity && (
										<AiTwotoneStar size={15} style={{ color: 'orange', paddingTop: 2 }} />
									)}
								</Link>
							</li>
						)
					})}
			</ul>

			<Outlet />
		</section>
	)
}

export default CardsContainer
