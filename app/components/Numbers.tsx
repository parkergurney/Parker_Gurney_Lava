import React from 'react'
import Image from 'next/image'

interface NumbersProps {
	productId: string
	stock: number
	orders: number
	onStockChange?: (id: string, newStock: number) => void
}

const Numbers: React.FC<NumbersProps> = ({ productId, stock, orders, onStockChange }) => {
	const updateStock = async (newStock: number) => {
		const res = await fetch(`/api/products/${productId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ stock: newStock }),
		})
		if (res.ok) onStockChange?.(productId, newStock)
	}
	const addClass = 'w-1/4 h-[46px] flex transition-colors justify-center items-center hover:bg-[#F2F2F2] bg-white transition-colors border border-[#D4D4D4]'
	return (
		<div className='w-full sm:w-[196px] h-[48px] flex'>
			<button
				onClick={() => updateStock(stock - 1)}
				disabled={stock <= 0}
				className={`border-r-0 rounded-l-sm ${addClass}`}
			>
				<Image src='/console/minus.svg' alt='Minus' width={18} height={18} />
			</button>
			<div className='w-1/2 h-[48px] flex flex-col'>
				<div className={`border transition-colors border-b-0 w-full h-[30px] text-sm flex justify-center items-center ${orders > stock ? 'bg-[#FAF2E3] border-[#C19A4D]' : 'bg-white border-[#D4D4D4]'}`}>
					{stock.toString()}
				</div>
				<div className={`w-full transition-colors h-[16px] text-xs flex justify-center items-center border ${orders > stock ? 'text-[#FAFAFA] bg-[#C19A4D] border-[#C19A4D]' : 'bg-[#F2F2F2] border-[#D4D4D4] text-[#808080]'}`}>
					{orders.toString()} PCS
				</div>
			</div>
			<button
				onClick={() => updateStock(stock + 1)}
				disabled={stock <= 0}
				className={`border-l-0 rounded-r-sm ${addClass}`}
			>
				<Image src='/console/plus.svg' alt='Plus' width={18} height={18} />
			</button>
		</div>
	)
}

export default Numbers