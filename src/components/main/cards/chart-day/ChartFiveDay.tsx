import { ChartOptions } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { WeatherData } from '../../../../types/response-types'
import {
	ChartFormItem,
	transformWeatherData,
} from '../../../../utils/transformWeaterData'

interface IChartFiveDayProps {
	cardInfo: WeatherData
}

const ChartFiveDay: React.FC<IChartFiveDayProps> = ({ cardInfo }) => {
	const [chartKey, setChartKey] = useState(Math.random())
	const { daily } = transformWeatherData(cardInfo)

	const data = {
		labels: daily.map((item: ChartFormItem) => item.period),
		datasets: [
			{
				label: 'Temperature',
				data: daily.map((item: ChartFormItem) => item.temp),
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
					text: 'Time (Day)',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Average temperature (°C)',
				},
				ticks: {
					stepSize: 1,
				},
			},
		},
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
