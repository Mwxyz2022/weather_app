import { FC, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext'
import Card from './card/Card'

const CardWrapper: FC = () => {
	const { cityId } = useParams()

	const navigate = useNavigate()
	const { storedCities } = useContext(AppContext)

	const initData = storedCities.find(
		(city: any) => city.id.toString() === cityId
	)

	useEffect(() => {
		if (!initData) {
			navigate(`/`)
		}
	}, [cityId])

	return (
		<div className='card__wrapper'>
			{initData ? (
				<Card initData={initData} />
			) : (
				<div className='loaded'>Loading...</div>
			)}
		</div>
	)
}

export default CardWrapper