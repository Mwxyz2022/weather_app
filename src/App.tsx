import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './components/header/Header'

import './assets/app.css'

const App: FC = () => {
	return (
		<>
			<Header />
			<main className='main'>
				<section className='main__container'>
					<Outlet />
				</section>
			</main>
		</>
	)
}

export default App
