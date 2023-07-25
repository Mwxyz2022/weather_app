import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const NotFound: FC = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [countdown, setCountdown] = useState(3)

	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			navigate('/')
		}, countdown * 1000)

		const interval = setInterval(() => {
			setCountdown(prevCountdown => prevCountdown - 1)
		}, 1000)

		return () => {
			clearTimeout(redirectTimer)
			clearInterval(interval)
		}
	}, [countdown, navigate])

	console.log(countdown)

	return (
		<section className='not-found'>
			<h1>{t('not_found')}</h1>
			<p>{t('does_not_exist')}</p>
			<p>{t('redirecting_to_the_three_sec', { countdown })}</p>
		</section>
	)
}

export default NotFound
