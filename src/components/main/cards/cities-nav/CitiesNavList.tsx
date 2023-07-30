import { FC, useContext, useState } from 'react'
import { AiTwotoneStar } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'

import { AppContext } from '../../../../context/AppContext'
import useScreenWidth from '../../../../hooks/useScreenWidth'
import { ICityData } from '../../../../types/response.types'
import { AppContextValue } from '../../../../types/types'

import './cities-navigation.css'

const CitiesNavList: FC = () => {
	const screenWidth = useScreenWidth()
	const [isOpenList, setIsOpenList] = useState<boolean>(false)
	const { storedCities, favoriteCities } = useContext<AppContextValue>(AppContext)
	const { cityId } = useParams()

	const isMobileScreen = screenWidth < 750

	return (
		<ul className='city-nav'>
			{!!storedCities.length &&
				storedCities.map((city: ICityData) => {
					const isActive = cityId === `${city.id}`

					const isFavoriteCity = favoriteCities.some(favCity => favCity.id === city.id)

					return (
						<li
							key={city.id}
							className={isActive ? 'city-nav-item link-active' : 'city-nav-item'}
							style={{
								display: isOpenList || isActive ? 'flex' : 'none',

								borderRadius: isMobileScreen && !isOpenList && isActive ? '4px' : ''
							}}
							onClick={() => setIsOpenList(prev => !prev)}
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
	)
}

export default CitiesNavList
