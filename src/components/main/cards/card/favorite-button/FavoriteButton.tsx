import { FC, useContext } from 'react'
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'

import { AppContext } from '../../../../../context/AppContext'
import { AppContextValue } from '../../../../../types/types'

interface IFavoriteButtonProps {
	cityId: number
}

const FavoriteButton: FC<IFavoriteButtonProps> = ({ cityId }) => {
	const { storedCities, favoriteCities, setFavoriteCities } =
		useContext<AppContextValue>(AppContext)

	const isFavoriteCity = favoriteCities.some(city => city.id === cityId)

	const onFavoriteHandler = () => {
		if (isFavoriteCity) {
			const newFavStorage = favoriteCities.filter(city => city.id !== cityId)

			localStorage.setItem('favorites', JSON.stringify(newFavStorage))
			setFavoriteCities(newFavStorage)
		} else {
			const cityData = storedCities.find(city => city.id === cityId)

			if (cityData) {
				localStorage.setItem('favorites', JSON.stringify([...favoriteCities, cityData]))
				setFavoriteCities([...favoriteCities, cityData])
			}
		}
	}

	return (
		<>
			<button className='button__favorite' onClick={onFavoriteHandler}>
				{isFavoriteCity ? (
					<AiTwotoneStar size={30} style={{ color: 'orange' }} />
				) : (
					<AiOutlineStar size={30} />
				)}
			</button>
		</>
	)
}

export default FavoriteButton
