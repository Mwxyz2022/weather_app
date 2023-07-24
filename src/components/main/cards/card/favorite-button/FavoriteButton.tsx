import { FC, useContext } from 'react'

import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai'
import { AppContext } from '../../../../../context/AppContext'
import { putToStorage } from '../../../../../utils/city.helper'

interface IFavoriteButtonProps {
	cityId: number
}

const FavoriteButton: FC<IFavoriteButtonProps> = ({ cityId }) => {
	const { storedCities, favoriteCities, setFavoriteCities } =
		useContext(AppContext)

	const isFavoriteCity = favoriteCities.some((city: any) => city.id === cityId)

	const onFavoriteHandler = async () => {
		if (isFavoriteCity) {
			const newFavStorage = favoriteCities.filter(
				(city: any) => city.id !== cityId
			)

			await putToStorage(newFavStorage, 'favorites')
			setFavoriteCities(newFavStorage)
		} else {
			const cityData = storedCities.find((city: any) => city.id === cityId)
			const newFavStorage = !!favoriteCities
				? [...favoriteCities, cityData]
				: [cityData]

			await putToStorage(newFavStorage, 'favorites')
			setFavoriteCities(newFavStorage)
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
