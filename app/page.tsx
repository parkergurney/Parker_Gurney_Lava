import React from 'react'
import Image from 'next/image'

const page = () => {
	return (
		<div>
			hi
			<Image src='/logoimage.png' alt='Logo' width={200} height={200} />
		</div>
	)
}

export default page