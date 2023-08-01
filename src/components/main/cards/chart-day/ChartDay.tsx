import { ChartOptions } from 'chart.js'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { HourlyWeather } from '../../../../types/response.types'

interface IChartDayProps {
	hourlyData: HourlyWeather[]
	timezoneOffset: number
}

const ChartDay: React.FC<IChartDayProps> = ({ hourlyData, timezoneOffset }) => {
	const [chartKey, setChartKey] = useState(Math.random())
	const { t, i18n } = useTranslation()

	const timeFormat = i18n.language === 'ua' ? 'H:mm' : 'h A'

	const dataForDay = hourlyData.slice(0, 24)

	const data = {
		labels: dataForDay.map(item =>
			moment
				.unix(item.dt)
				.utcOffset(timezoneOffset / 60)
				.locale(i18n.language)
				.format(timeFormat)
		),
		datasets: [
			{
				label: 'Temperature',
				data: dataForDay.map(item => Math.round(item.temp)),
				borderColor: 'rgb(75, 192, 192)',
				fill: false
			}
		]
	}

	const options: ChartOptions<'line'> = {
		scales: {
			x: {
				title: {
					display: true,
					text: t('chart_period_hours')
				}
			},
			y: {
				title: {
					display: true,
					text: t('chart_temperature')
				}
			}
		},
		responsive: true,
		maintainAspectRatio: true
	}

	useEffect(() => {
		const resizeHandler = () => {
			setChartKey(Math.random())
		}

		window.addEventListener('resize', resizeHandler)
		return () => window.removeEventListener('resize', resizeHandler)
	}, [])

	return <Line key={chartKey} data={data} options={options} />
}

export default ChartDay
