import React from 'react'
import Image from 'next/image'
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
	const updateStock = async (newStock: number) => {
		await fetch(`/api/products/${product.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ stock: newStock }),
		})
		onStockChange?.(product.id, newStock)
	}
	return (
		<div className="flex items-center justify-between rounded-sm h-[48px] w-full">
			<div className="flex items-center space-x-[16px]">
				{product.imageUrl && (
					<div className='bg-[#FAFAFA] border border-[#D4D4D4] rounded-sm w-[48px] h-[48px] flex justify-center items-center'>
						<img src={product.imageUrl} alt={product.name} className="w-[34px] h-[34px]" />
					</div>
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