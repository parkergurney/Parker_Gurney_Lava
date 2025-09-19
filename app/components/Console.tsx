import React from 'react'
import Image from 'next/image'
import Row from './Row'

const Console = () => {
	return (
		<div className='w-full border border-[#D9D9D9] bg-white p-[12px] rounded-sm flex flex-col space-y-4'>
			<div className='flex justify-between space-x-[12px] mr-0'>
				<div className='flex space-x-[4px] w-full'>
					<div className='relative w-full sm:max-w-[360px] sm:mr-4'>
						<div className='absolute left-2 top-[12px] pointer-events-none'>
							<Image alt='Search' src='/console/search.svg' width={14} height={14}
								className='pointer-events-none' />
						</div>
						<input
							type="text"
							className='h-[36px] w-full text-sm pl-8 pr-2 outline-none border-[#D4D4D4] border rounded-sm'
							placeholder='Search Materials'
						/>
					</div>
					<Image alt='sort by' src='/console/sort.svg' width={25} height={25} />
					<Image alt='flip' src='/console/flip.svg' width={25} height={25} />
				</div>
				<button onClick={() => { }}
					className='bg-[#444EAA] text-white sm:m-0 rounded-sm text-sm p-2 flex justify-center gap-2 items-center sm:w-[108px] w-[36px]'>
					<Image alt='plus' src='/console/smallplus.svg' width={10} height={10} />
					<span className='hidden sm:inline text-nowrap'>Add New</span>
				</button>
			</div>
			<Row />
		</div>
	)
}

export default Console