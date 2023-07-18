import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Favorites from '../components/favorites/Favorites'
import Main from '../components/main/Main'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '/favorites',
				element: <Favorites />,
			},
		],
	},
])

export default router
