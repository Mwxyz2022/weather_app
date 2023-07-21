import { ChartOptions } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { WeatherData } from '../../../../types/response-types'
import {
	ChartFormItem,
	transformWeatherData,
} from '../../../../utils/transformWeaterData'

interface IChartDayProps {
	cardInfo: WeatherData
}

const ChartDay: React.FC<IChartDayProps> = ({ cardInfo }) => {
	const [chartKey, setChartKey] = useState(Math.random())
	const { hourly } = transformWeatherData(cardInfo)

	const data = {
		labels: hourly.map((item: ChartFormItem) => item.period),
		datasets: [
			{
				label: 'Temperature',
				data: hourly.map((item: ChartFormItem) => item.temp),
				borderColor: 'rgb(75, 192, 192)',
				fill: false,
			},
		],
	}

	const options: ChartOptions<'line'> = {
		scales: {
			x: {
				title: {
					display: true,
					text: 'Time (Hours)',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Temperature (°C)',
				},
			},
		},
		responsive: true,
		maintainAspectRatio: true,
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
