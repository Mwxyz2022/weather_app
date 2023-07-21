import { FC, useState } from 'react'

import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

import './cities-list.css'

const CitiesList: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const onListHandler = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<button className='list__button' onClick={onListHandler}>
				{isOpen ? (
					<IoMdArrowDropup size={25} />
				) : (
					<IoMdArrowDropdown size={25} />
				)}
			</button>
		</>
	)
}

export default CitiesList
