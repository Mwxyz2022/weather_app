import { useEffect, useState } from 'react'

export const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	const handleResize = () => {
		setWindowWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const widthUp = windowWidth > 899

	return {
		windowWidth,
		widthUp,
	}
}
