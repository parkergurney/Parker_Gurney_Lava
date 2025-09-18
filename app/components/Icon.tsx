import React, { ReactNode } from 'react'

const Icon = ({ active, children, onClick }: { active: boolean; children: ReactNode; onClick?: () => void }) => {
	return (
		<button 
			onClick={onClick}
			className={`w-[36px] h-[36px] cursor-pointer flex justify-center items-center border border-transparent hover:border-[var(--icon-border)] hover:bg-[var(--icon-fill)]
				rounded-sm
				transition-colors ${active ? 'text-[var(--icon-active)]' : 'text-[var(--icon-inactive)]'}`}
		>
			{children}
		</button>
	)
}

export default Icon