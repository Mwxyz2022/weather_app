import { FC, useContext } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'

import { AppContext } from '../../../context/AppContext'
import { AppContextValue } from '../../../types/types'

import './cards-container.css'

const CardsContainer: FC = () => {
	const { storedCities } = useContext<AppContextValue>(AppContext)
	const { cityId } = useParams()

	return (
		<section className='cards__container'>
			<ul className='city-nav'>
				{!!storedCities.length &&
					storedCities.map((city: any) => {
						const isActive = cityId === `${city.id}`

						return (
							<li
								className={isActive ? 'city-nav-item link-active' : 'city-nav-item'}
								key={city.id}
							>
								<Link className='city-link' to={`/city/${city.id}`}>
									{city.name}
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
