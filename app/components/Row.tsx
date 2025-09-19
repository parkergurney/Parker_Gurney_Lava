import React from 'react'
import Numbers from './Numbers'

interface RowProps {
	product: {
		id: string
		name: string
		imageUrl: string
		size: number
		stock: number
		orders: number
	}
	onStockChange?: (id: string, newStock: number) => void
}

const sizes = ['none', 'S', 'M', 'L']

const Row: React.FC<RowProps> = ({ product, onStockChange }) => {
	return (
		<div className="flex items-start border sm:border-none p-2 space-y-2 sm:p-0 sm:space-y-0 border-[#D4D4D4] sm:items-center justify-between rounded-sm flex-col h-full sm:flex-row sm:h-[48px] w-full">
			<div className="flex items-center space-x-[16px]">
				{product.imageUrl && (
					<img src={product.imageUrl} alt={product.name} className="border border-[#D4D4D4] rounded-sm w-[48px] h-[48px] object-contain" />
				)}
				<span className="font-medium text-sm">{product.name} / {sizes[product.size]}</span>
			</div>
			<Numbers
				productId={product.id}
				stock={product.stock}
				orders={product.orders}
				onStockChange={(id, newStock) =>
					onStockChange?.(id, newStock)
				}
			/>
		</div>
	)
}

export default Row