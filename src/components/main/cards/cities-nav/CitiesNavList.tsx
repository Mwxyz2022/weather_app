import { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiTwotoneStar } from 'react-icons/ai'
import { VscListFlat } from 'react-icons/vsc'
import { Link, useParams } from 'react-router-dom'

import { AppContext } from '../../../../context/AppContext'
import useScreenWidth from '../../../../hooks/useScreenWidth'
import { ICityData } from '../../../../types/response.types'
import { AppContextValue } from '../../../../types/types'

import './cities-navigation.css'

const CitiesNavList: FC = () => {
	const [isOpenList, setIsOpenList] = useState<boolean>(false)
	const { storedCities, favoriteCities } = useContext<AppContextValue>(AppContext)
	const { cityId } = useParams()
	const { i18n } = useTranslation()
	const language = i18n.language

	const screenWidth = useScreenWidth()
	const isMobileScreen = screenWidth < 750

	return (
		<ul className='city__navigation'>
			{!!storedCities.length &&
				storedCities.map((city: ICityData) => {
					const isActive = cityId === `${city.id}`
					const isFavoriteCity = favoriteCities.some(favCity => favCity.id === city.id)

					const getDisplay = () => {
						if (isMobileScreen) return isOpenList || isActive ? 'flex' : 'none'

						return 'flex'
					}

					const getBorderRadius = () => {
						if (
							(isMobileScreen && !isOpenList && isActive) ||
							(isMobileScreen && storedCities.length === 1)
						)
							return '4px'

						if (!isMobileScreen) return '4px 4px 0 0'

						return ''
					}

					const onListCityHandler = () => {
						if (isMobileScreen && storedCities.length > 1) {
							setIsOpenList(prev => !prev)
						}
						return
					}

					return (
						<li
							key={city.id}
							className={isActive ? 'navigation__item navigation__item-active' : 'navigation__item'}
							style={{
								display: getDisplay(),
								borderRadius: getBorderRadius()
							}}
							onClick={onListCityHandler}
						>
							<Link className='city-link' to={`/city/${city.id}`}>
								{city.location[language]}
								{isFavoriteCity && (
									<AiTwotoneStar
										size={15}
										style={{ color: 'orange', paddingTop: 2, marginLeft: 4 }}
									/>
								)}

								{isMobileScreen && !isOpenList && isActive ? (
									<span className='city-link__icon'>
										<VscListFlat style={{ marginLeft: 8 }} />
										<span className='icon__counter'>{storedCities.length}/5</span>
									</span>
								) : null}
							</Link>
						</li>
					)
				})}
		</ul>
	)
}

export default CitiesNavList
