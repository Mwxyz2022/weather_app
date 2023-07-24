import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import NotFound from '../components/NotFound'
import Favorites from '../components/favorites/Favorites'
import Main from '../components/main/Main'
import CardWrapper from '../components/main/cards/CardWrapper'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Main />,
				children: [
					{
						path: '/city/:cityId',
						element: <CardWrapper key='/city/:cityId' />
					}
				]
			},
			{
				path: '/favorites',
				element: <Favorites />
			},
			{ path: '*', element: <NotFound /> }
		]
	}
])

export default router
