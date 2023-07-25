import { FC } from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader: FC = () => {
	return (
		<div className='loader__container' style={{ display: 'flex', justifyContent: 'center' }}>
			<ColorRing
				visible={true}
				height='60'
				width='60'
				ariaLabel='blocks-loading'
				wrapperStyle={{}}
				wrapperClass='blocks-wrapper'
				colors={['#a0c4f2', '#9bcef7', '#70e1f2', '#e7de79', '#efc25d']}
			/>
		</div>
	)
}

export default Loader
