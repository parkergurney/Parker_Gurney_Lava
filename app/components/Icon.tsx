import React, { ReactNode } from 'react'

const Icon = ({ active, children, onClick, isExpanded, name }: { active: boolean; children: ReactNode; onClick?: () => void; isExpanded: boolean; name: string }) => {
	return (
		<button
			onClick={onClick}
			className={`h-[36px] w-full cursor-pointer flex p-[6px] justify-start items-center border hover:border-[var(--icon-border)] hover:bg-[var(--icon-fill)] rounded-sm
				transition-all duration-300 ease-in-out
				${isExpanded ? 'max-w-[176px]' : 'max-w-[36px]'}
				transition-all ${active ? 'text-[var(--icon-active)] border-[var(--icon-border)] bg-[var(--icon-fill)]' : 'border-transparent text-[var(--icon-inactive)]'}`}
		>
			<div className='flex space-x-[12px]'>
				{children}
				<div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'}`}>
					<p className='capitalize whitespace-nowrap text-sm'>{name}</p>
				</div>
			</div>
		</button>
	)
}

export default Icon