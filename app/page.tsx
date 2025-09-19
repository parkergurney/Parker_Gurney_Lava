'use client'
import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Console from './components/Console'

const page = () => {
	const [onInventory, setOnInventory] = useState(true);
	const [isFormOpen, setIsFormOpen] = useState(false)
	return (
		<div className='flex'>
			<div className='flex-none sticky top-0'>
			<Sidebar />
			</div>
			<div className='flex-1 w-full flex justify-center'>
				<div className='flex flex-col w-full max-w-screen-lg mx-4 pt-[36px] space-y-[12px]'>
					<div className={`w-full h-[80px] sm:h-[41px] flex flex-col sm:flex-row items-center sm:justify-between ${isFormOpen ? 'blur-sm' : ''}`}>
						<h1 className='text-[#1A1A1A] mb-2 sm:mb-0 text-2xl'>Materials <span className='text-[#AAAAAA]'>/ Blanks</span></h1>
						<div className="relative w-[204px] h-[41px] bg-[#E6E6E6] rounded-sm p-[4px] flex justify-between items-center">
							<div className={`absolute top-[4px] left-[4px] w-[96px] h-[33px] bg-white rounded-sm border border-[#D4D4D4] transition-transform duration-300 ease-in-out
      ${onInventory ? 'translate-x-0' : 'translate-x-[100px]'}`}/>
							<button onClick={() => setOnInventory(true)}
								className={`relative z-10 w-[96px] h-[28px] text-sm rounded-sm transition-colors duration-300
      ${onInventory ? 'text-[#333333]' : 'text-[#808080]'}`}>
								Inventory
							</button>
							<button onClick={() => setOnInventory(false)}
								className={`relative z-10 w-[96px] h-[28px] text-sm rounded-sm transition-colors duration-300
      ${!onInventory ? 'text-[#333333]' : 'text-[#808080]'}`}>
								Order Queue
							</button>
						</div>
					</div>
					<Console formOpen={isFormOpen} setFormOpen={setIsFormOpen} />
				</div>
			</div>
		</div>
	)
}

export default page