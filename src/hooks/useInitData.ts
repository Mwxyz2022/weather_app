import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { initCardInfo } from '../utils/local-storage/cities'

export const useInitData = () => {
	const { cityId } = useParams()
	const { storedCities } = useContext(AppContext)
	const navigate = useNavigate()

	const isStoragesId = storedCities
		.map((city: any) => `${city.id}`)
		.includes(cityId)

	const init = cityId ? initCardInfo(cityId) : null

	if (isStoragesId) {
		return init
	} else {
		navigate(`/city/${storedCities[0].id}`)
	}
}
