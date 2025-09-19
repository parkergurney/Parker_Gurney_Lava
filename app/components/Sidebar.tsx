'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Icon from './Icon'

const Sidebar = () => {
	const [activeTab, setActiveTab] = useState('components')
	const [isExpanded, setIsExpanded] = useState(false)
	const icons = [
		{
			name: 'components',
			svg: (
				<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.3408 11.4678C17.6378 11.4678 19.5 13.33 19.5 15.627C19.4998 17.9238 17.6377 19.7861 15.3408 19.7861C13.044 19.7861 11.1818 17.9237 11.1816 15.627C11.1816 13.33 13.0439 11.4678 15.3408 11.4678ZM1.19727 11.9043H7.24805C7.63274 11.9045 7.94434 12.2168 7.94434 12.6016V18.6523C7.94414 19.0369 7.63261 19.3484 7.24805 19.3486H1.19727C0.812519 19.3486 0.500201 19.037 0.5 18.6523V12.6016C0.5 12.2167 0.812396 11.9043 1.19727 11.9043ZM8.58301 0.864258C8.84684 0.37873 9.54379 0.378727 9.80762 0.864258L13.5537 7.75781C13.8058 8.22207 13.4697 8.78697 12.9414 8.78711H5.44922C4.92094 8.78695 4.58481 8.22206 4.83691 7.75781L8.58301 0.864258Z"
						stroke="currentColor" />
				</svg>
			)
		},
		{
			name: 'products',
			svg: (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M22.1396 11.08L10.7126 22.507C10.5174 22.7023 10.2008 22.7023 10.0055 22.507L1.41337 13.9148C1.21811 13.7196 1.21811 13.403 1.41337 13.2077L12.8404 1.78072C12.9487 1.67235 13.1008 1.61966 13.253 1.63778L20.9311 2.55184C21.1604 2.57913 21.3412 2.75992 21.3685 2.98922L22.2826 10.6673C22.3007 10.8195 22.248 10.9716 22.1396 11.08Z"
						stroke="currentColor" />
					<circle cx="16.4351" cy="7.48517" r="1.5" transform="rotate(45 16.4351 7.48517)" stroke="currentColor" />
				</svg>

			)
		},
		{
			name: 'fulfillment',
			svg: (
				<svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.66287 19.5687L1.83713 21.2357C1.5162 21.5287 1 21.301 1 20.8664V1.5C1 1.22386 1.22386 1 1.5 1H18.5C18.7761 1 19 1.22386 19 1.5V20.8664C19 21.301 18.4838 21.5287 18.1629 21.2357L16.3371 19.5687C16.1462 19.3943 15.8538 19.3943 15.6629 19.5687L13.3371 21.6922C13.1462 21.8665 12.8538 21.8665 12.6629 21.6922L10.3371 19.5687C10.1462 19.3943 9.85381 19.3943 9.66287 19.5687L7.33713 21.6922C7.14619 21.8665 6.85381 21.8665 6.66287 21.6922L4.33713 19.5687C4.14619 19.3943 3.85381 19.3943 3.66287 19.5687Z"
						stroke="currentColor" />
					<path d="M5 6H15" stroke="currentColor" strokeLinecap="round" />
					<path d="M5 10H15" stroke="currentColor" strokeLinecap="round" />
					<path d="M5 14H15" stroke="currentColor" strokeLinecap="round" />
				</svg>

			)
		},
		{
			name: 'separator',
			svg: null
		},
		{
			name: 'integrations',
			svg: (
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 12C1 11.4477 1.44772 11 2 11H8C8.55228 11 9 11.4477 9 12V18C9 18.5523 8.55228 19 8 19H2C1.44772 19 1 18.5523 1 18V12Z" stroke="currentColor" />
					<path d="M9 12C9 11.4477 9.44772 11 10 11H16C16.5523 11 17 11.4477 17 12V18C17 18.5523 16.5523 19 16 19H10C9.44772 19 9 18.5523 9 18V12Z" stroke="currentColor" />
					<path d="M1 4C1 3.44772 1.44772 3 2 3H8C8.55228 3 9 3.44772 9 4V10C9 10.5523 8.55228 11 8 11H2C1.44772 11 1 10.5523 1 10V4Z" stroke="currentColor" />
					<rect x="12" y="1" width="7" height="7" rx="3.5" stroke="currentColor" />
				</svg>
			)
		}
	]
	return (
		<div className={`h-screen border-r border-[var(--tertiary)] bg-sidebar-gradient flex flex-col justify-between items-start transition-all duration-300 py-[12px]
		${isExpanded ? 'w-[200px] px-[12px]' : 'w-[48px] px-[6px]'}`}>
			<div className='flex flex-col items-center space-y-[8px]'>
				<div className='w-full flex space-x-[4px]'>
					<Image
						src='/logoimage.png'
						alt='Logo'
						width={36}
						height={36}
						className='cursor-pointer'
						onClick={() => setIsExpanded(!isExpanded)}
					/>
					{isExpanded &&
						<h2 className='text-[var(--blue)] font-semibold text-xl'>Tally</h2>
					}
				</div>
				{icons.map(({ name, svg }) => {
					if (name === 'separator') {
						return <div key={name} className="w-[36px] h-[1px] bg-[var(--tertiary)]" />
					}
					return (
						<Icon
							key={name}
							active={activeTab === name}
							onClick={() => setActiveTab(name)}
							isExpanded={isExpanded}
							name={name}
						>
							{svg}
						</Icon>
					)
				})}
			</div>
			<div className='flex flex-col items-center space-y-[12px]'>
				<div className={`flex space-x-[12px] p-[8px] h-[36px]
					${isExpanded ? 'w-[176px]' : 'w-[36px]'}`}>
					<Image src='/logout.svg' alt='Logout Button' width={20} height={20} />
					{isExpanded &&
						<p className={`text-[var(--red)] text-sm duration-300 ease-in-out ${isExpanded? 'opacity-100' : 'opacity-0'}`}>
							Logout
						</p>
					}
				</div>
				<div className={`flex space-x-[12px] items-center h-[36px]
					${isExpanded ? 'w-[176px]' : 'w-[36px]'}`}>
					<Image src='/pfp.png' alt='Profile Photo' width={36} height={36} />
					{isExpanded &&
						<div className='flex justify-between w-full'>
							<div>
								<h4 className='whitespace-nowrap font-semibold text-sm/4'>Don't Ruin It</h4>
								<p className='whitespace-nowrap text-xs/4 text-[var(--icon-inactive)]'>Pro Crafter</p>
							</div>
							<Image src='/menu.svg' alt='More Details' width={12} height={12} />
						</div>
					}
				</div>
			</div>
		</div>

	)
}

export default Sidebar;