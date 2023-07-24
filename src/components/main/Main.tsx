import { FC } from 'react'

import SearchBar from './search-bar/SearchBar'

import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import CardsContainer from './cards/CardsContainer'
import './main.css'

const Main: FC = () => {
	useCurrentPosition()

	return (
		<>
			<section className='upper__container'>
				<SearchBar />
			</section>

			<CardsContainer />
		</>
	)
}

export default Main
