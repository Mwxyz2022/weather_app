import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'

import reportWebVitals from './test/reportWebVitals'

import router from './router/router'

import i18n from './i18n/_i18n.js'

import {
	CategoryScale,
	Chart,
	LineController,
	LineElement,
	LinearScale,
	PointElement,
} from 'chart.js'

import './assets/index.css'

Chart.register(
	LineController,
	LinearScale,
	PointElement,
	LineElement,
	CategoryScale
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	// <React.StrictMode>
	<I18nextProvider i18n={i18n}>
		<RouterProvider router={router} />
	</I18nextProvider>
	// </React.StrictMode>
)

reportWebVitals()
