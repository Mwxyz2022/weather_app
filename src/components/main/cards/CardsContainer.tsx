import { FC, useContext } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import { CitiesContext } from '../../../context/CitiesContext'
import { useWindowWidth } from '../../../hooks/useWindowWidth'
import './cards-container.css'

const CardsContainer: FC = () => {
	const navigate = useNavigate()
	const { widthUp } = useWindowWidth()
	const { storedCities, setStoredCities } = useContext(CitiesContext)
	const { cityId } = useParams()

	const deleteHandler = (cityId: number) => {
		const citiesList = storedCities.filter((city: any) => city.id !== cityId)
		const lastCity = citiesList[citiesList.length - 1]
		const path = lastCity ? `/city/${lastCity.id}` : '/'

		setStoredCities(citiesList)
		localStorage.setItem('cities', JSON.stringify(citiesList))

		navigate(path)
	}

	return (
		<section className='cards__container'>
			{widthUp && (
				<ul className='city-nav'>
					{!!storedCities.length &&
						storedCities.map((city: any) => {
							const isActive = cityId === `${city.id}`

							return (
								<li
									className={
										isActive ? 'city-nav-item link-active' : 'city-nav-item'
									}
									key={city.id}
								>
									<Link className='city-link' to={`/city/${city.id}`}>
										{city.name}
									</Link>
									<button
										className='delete-button'
										onClick={() => deleteHandler(city.id)}
									>
										+
									</button>
								</li>
							)
						})}
				</ul>
			)}

			<Outlet />
		</section>
	)
}

export default CardsContainer
