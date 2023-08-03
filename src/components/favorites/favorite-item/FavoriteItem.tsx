import { FC, MouseEvent, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosArrowBack } from 'react-icons/io'
import { MdOutlineClose } from 'react-icons/md'

import { AppContext } from '../../../context/AppContext'
import { ICityData } from '../../../types/response.types'
import { AppContextValue } from '../../../types/types'
import Card from '../../main/cards/card/Card'

import './favorite-item.css'

interface IFavoriteItemProps {
	cityData: ICityData
}

const FavoriteItem: FC<IFavoriteItemProps> = ({ cityData }) => {
	const { favoriteCities, setFavoriteCities } = useContext<AppContextValue>(AppContext)
	const [isShow, setIsShow] = useState<boolean>(false)
	const { i18n } = useTranslation()
	const language = i18n.language

	const { id: cityId } = cityData

	const onShowHandler = (event: MouseEvent) => {
		event.stopPropagation()
		setIsShow(prev => !prev)
	}

	const onDeleteHandler = () => {
		const newFavStorage = favoriteCities.filter(city => city.id !== cityId)

		localStorage.setItem('favorites', JSON.stringify(newFavStorage))
		setFavoriteCities(newFavStorage)
	}

	return (
		<article className='favorite__city'>
			<section className='city__information' onClick={onShowHandler}>
				<span className='information_preview'>
					<img
						className='preview__icon'
						src={`https://flagicons.lipis.dev/flags/4x3/${cityData.country_code}.svg`}
						alt='flag'
					/>

					<p className='preview__name'>
						{cityData.location[language]}, {cityData.country[language]}
					</p>
				</span>
				<span className='information__actions'>
					<button className='actions__unfold' onClick={onShowHandler}>
						<IoIosArrowBack size={30} style={{ transform: isShow ? 'rotate(270deg)' : 'none' }} />
					</button>
					<button className='actions__delete' onClick={onDeleteHandler}>
						<MdOutlineClose size={30} />
					</button>
				</span>
			</section>

			{isShow && <Card initData={cityData} />}
		</article>
	)
}

export default FavoriteItem
