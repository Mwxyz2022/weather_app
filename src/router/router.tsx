import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Favorites from '../components/favorites/Favorites'
import Main from '../components/main/Main'
import Card from '../components/main/cards/card/Card'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Main />,
				children: [
					{ path: '/city/:cityId', element: <Card key='/city/:cityId' /> },
				],
			},
			{
				path: '/favorites',
				element: <Favorites />,
			},
		],
	},
])

export default router
