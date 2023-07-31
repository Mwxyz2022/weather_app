import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import CitiesNavList from './cities-nav/CitiesNavList'

const CardsContainer: FC = () => {
	return (
		<section className='cards__container'>
			<CitiesNavList />

			<Outlet />
		</section>
	)
}

export default CardsContainer
