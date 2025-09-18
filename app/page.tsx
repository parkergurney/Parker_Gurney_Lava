import React from 'react'
import Image from 'next/image'
import Sidebar from './components/Sidebar'

const page = () => {
	return (
		<div className='flex'>
			<Sidebar />
			Home
		</div>
	)
}

export default page