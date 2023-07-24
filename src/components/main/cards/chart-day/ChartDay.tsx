import { ChartOptions } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { ChartFormItem } from '../../../../utils/transformWeaterData'

interface IChartDayProps {
	cardInfo: any
}

const ChartDay: React.FC<IChartDayProps> = ({ cardInfo }) => {
	const [chartKey, setChartKey] = useState(Math.random())
	const { t } = useTranslation()

	const data = {
		labels: cardInfo.map((item: ChartFormItem) => item.period),
		datasets: [
			{
				label: 'Temperature',
				data: cardInfo.map((item: ChartFormItem) => item.temp),
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
