import {
	CategoryScale,
	Chart,
	LineController,
	LineElement,
	LinearScale,
	PointElement
} from 'chart.js'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'

import './assets/index.css'
import i18n from './i18n/_i18n.js'
import router from './router/router'
import reportWebVitals from './test/reportWebVitals'

Chart.register(LineController, LinearScale, PointElement, LineElement, CategoryScale)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StrictMode>
		<I18nextProvider i18n={i18n}>
			<RouterProvider router={router} />
		</I18nextProvider>
	</StrictMode>
)

reportWebVitals()
