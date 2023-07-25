export const initLanguage = (): string => {
	try {
		const language = localStorage.getItem('language')
		return language ? JSON.parse(language) : 'uk'
	} catch (error) {
		console.error('Error parsing language from localStorage:', error)
		return 'uk'
	}
}
