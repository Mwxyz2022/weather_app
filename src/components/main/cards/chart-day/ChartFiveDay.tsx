import { ChartOptions } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { ChartFormItem } from '../../../../utils/transformWeaterData'

interface IChartFiveDayProps {
	cardInfo: any
}

const ChartFiveDay: React.FC<IChartFiveDayProps> = ({ cardInfo }) => {
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
