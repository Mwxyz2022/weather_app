import { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { AppContext } from '../../../context/AppContext'
import { AppContextValue } from '../../../types/types'

import './madal-delete-city.css'

interface IModalDeleteCityProps {
	setIsShowDeleteModal: (isShow: boolean) => void
}

const ModalDeleteCity: FC<IModalDeleteCityProps> = ({ setIsShowDeleteModal }) => {
	const { storedCities, setStoredCities } = useContext<AppContextValue>(AppContext)
	const navigate = useNavigate()
	const { cityId } = useParams()
	const { t } = useTranslation()

	const deleteHandler = () => {
		const citiesList = storedCities.filter((city: any) => city.id.toString() !== cityId)
		const lastCity = citiesList[citiesList.length - 1]
		const path = lastCity ? `/city/${lastCity.id}` : '/'

		setStoredCities(citiesList)
		localStorage.setItem('cities', JSON.stringify(citiesList))

		navigate(path)
		setIsShowDeleteModal(false)
	}

	return (
		<div className='modal--delete'>
			<div className='modal__content'>
				<h2 className='modal__title'>{t('modal_delete_title')}</h2>
				<p className='modal__description'>{t('modal_delete_description')}</p>
				<div className='modal__buttons'>
					<button className='modal__button modal__button--confirm' onClick={deleteHandler}>
						{t('modal_delete_button_confirm')}
					</button>
					<button
						className='modal__button modal__button--cancel'
						onClick={() => setIsShowDeleteModal(false)}
					>
						{t('modal_delete_button_cancel')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalDeleteCity
