import { ChartOptions } from 'chart.js'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

import { DailyWeather } from '../../../../types/response.types'

interface IChartFiveDayProps {
	dailyData: DailyWeather[]
	timezoneOffset: number
}

const ChartFiveDay: React.FC<IChartFiveDayProps> = ({ dailyData, timezoneOffset }) => {
	const [chartKey, setChartKey] = useState(Math.random())
	const { t, i18n } = useTranslation()

	const dateFormat = i18n.language === 'uk' ? 'D MMM' : 'MMM D'

	const dataForFiveDay = dailyData.slice(0, 5)

	const data = {
		labels: dataForFiveDay.map(item =>
			moment
				.unix(item.dt)
				.utcOffset(timezoneOffset / 60)
				.locale(i18n.language)
				.format(dateFormat)
		),
		datasets: [
			{
				label: 'Temperature',
				data: dataForFiveDay.map(item => {
					const averageTemp = (item.temp.max + item.temp.min) / 2

					return Math.round(averageTemp)
				}),
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
					text: t('chart_period_days')
				}
			},
			y: {
				title: {
					display: true,
					text: t('chart_temperature_average')
				},
				ticks: {
					stepSize: 1
				}
			}
		}
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

export default ChartFiveDay
