import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			navigate('/')
		}, 3000)

		return () => clearTimeout(redirectTimer)
	}, [])

	return (
		<section className='not-found'>
			<h1>{t('not_found')}</h1>
			<p>{t('does_not_exist')}</p>
			<p>{t('redirecting_to_the_three_sec')}</p>
		</section>
	)
}

export default NotFound
