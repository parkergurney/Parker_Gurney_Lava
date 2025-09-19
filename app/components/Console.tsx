import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Row from './Row'
import ProductForm from './ProductForm'

interface ConsoleProps {
	formOpen: boolean
	setFormOpen: (open: boolean) => void
}

interface Product {
	id: string
	name: string
	imageUrl: string
	size: number
	stock: number
	orders: number
	addedAt: string
}

const Console: React.FC<ConsoleProps> = ({ formOpen, setFormOpen }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const fetchProducts = async () => {
		try {
			const res = await fetch('/api/products')
			if (!res.ok) throw new Error('Failed to fetch products')
			const data = await res.json()
			setProducts(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchProducts()
	}, [])
	useEffect(() => {
		fetchProducts()
	}, [formOpen])


	return (
		<div className=''>
			{formOpen && <ProductForm onClose={() => setFormOpen(false)} />}
			<div className={`w-full border border-[#D9D9D9] bg-white p-[12px] rounded-sm flex flex-col space-y-4
				${formOpen ? 'blur-sm' : 'blur-none'}`}>
				<div className='flex justify-between space-x-[12px] mr-0'>
					<div className='flex space-x-[4px] w-full'>
						<div className='relative w-full sm:max-w-[360px] sm:mr-4'>
							<div className='absolute left-2 top-[12px] pointer-events-none'>
								<Image alt='Search' src='/console/search.svg' width={14} height={14}
									className='pointer-events-none' />
							</div>
							<input type="text"
								className='h-[36px] w-full text-sm pl-8 pr-2 outline-none border-[#D4D4D4] border rounded-sm'
								placeholder='Search Materials' />
						</div>
						<Image alt='sort by' src='/console/sort.svg' width={25} height={25} />
						<Image alt='flip' src='/console/flip.svg' width={25} height={25} />
					</div>
					<button onClick={() => setFormOpen(true)}
						className='bg-[#444EAA] text-white sm:m-0 rounded-sm text-sm p-2 flex justify-center gap-2 items-center sm:w-[108px] w-[36px]'>
						<Image alt='plus' src='/console/smallplus.svg' width={10} height={10} />
						<span className='hidden sm:inline text-nowrap'>Add New</span>
					</button>
				</div>
				{!loading && !error && (
					<div className="flex flex-col space-y-2">
						{products.length === 0 ? (
							<div>No products found</div>
						) : (
							products.map((product) => (
								<Row key={product.id} product={product} onStockChange={(id, newStock) => setProducts(prev =>
											prev.map(p => p.id === id ? { ...p, stock: newStock } : p))}/>
							)))}
					</div>)}
				{loading && (
					<div className="flex flex-col space-y-3">
						{Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className="w-full h-[48px] rounded-sm overflow-hidden relative">
								<div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F5] via-[#EAEAEA] to-[#F5F5F5] animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
							</div>
						))}
					</div>
				)}

			</div>
		</div>
	)
}

export default Console