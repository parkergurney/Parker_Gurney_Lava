import React, { ReactNode } from 'react'

const Icon = ({ active, children, onClick }: { active: boolean; children: ReactNode; onClick?: () => void }) => {
	return (
		<button 
			onClick={onClick}
			className={`w-[36px] h-[36px] flex justify-center items-center hover:bg-black/10 transition-colors ${active ? 'text-[var(--icon-active)]' : 'text-[var(--icon-inactive)]'}`}
		>
			{children}
		</button>
	)
}

export default Icon