import React, { useState, useEffect, useRef } from 'react'
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
	const [openMenu, setOpenMenu] = useState<"sort" | "flip" | null>(null)
	const [sortKey, setSortKey] = useState<'addedAt' | 'name' | 'stock' | 'orders'>('addedAt')
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

	const sortRef = useRef<HTMLDivElement>(null)
	const flipRef = useRef<HTMLDivElement>(null)

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

	const sorts = [
		{ name: 'Date Added', key: 'addedAt' },
		{ name: 'Alphabetically', key: 'name' },
		{ name: 'Stock', key: 'stock' },
		{ name: 'Orders', key: 'orders' },
	]

	const toggleMenu = (menu: "sort" | "flip") => {
		setOpenMenu(prev => (prev === menu ? null : menu))
	}

	const sortedProducts = [...products].sort((a, b) => {
		let valA = a[sortKey]
		let valB = b[sortKey]
		if (typeof valA === 'string' && typeof valB === 'string') {
			valA = valA.toLowerCase()
			valB = valB.toLowerCase()
			if (valA < valB) return sortDirection === 'asc' ? -1 : 1
			if (valA > valB) return sortDirection === 'asc' ? 1 : -1
			return 0
		} else {
			const numA = Number(valA)
			const numB = Number(valB)
			return sortDirection === 'asc' ? numA - numB : numB - numA
		}
	})

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				sortRef.current &&
				!sortRef.current.contains(e.target as Node) &&
				flipRef.current &&
				!flipRef.current.contains(e.target as Node)
			) {
				setOpenMenu(null)
			}
		}
		document.addEventListener("click", handleClickOutside)
		return () => document.removeEventListener("click", handleClickOutside)
	}, [])


	return (
		<div className=''>
			{formOpen && <ProductForm onClose={() => setFormOpen(false)} />}
			<div className={`w-full border border-[#D9D9D9] bg-white p-[12px] rounded-sm flex flex-col space-y-4
				${formOpen ? 'blur-sm transition-all' : 'blur-none transition-all'}`}>
				<div className='flex justify-between space-x-[12px] mr-0'>
					<div className='flex space-x-[4px] w-full'>
						<div className='relative w-full sm:max-w-[360px] sm:mr-4'>
							<div className='absolute left-2 top-[12px] pointer-events-none'>
								<Image alt='Search' src='/console/search.svg' width={14} height={14}
									className='pointer-events-none' />
							</div>
							<input type="text" className='h-[36px] w-full text-sm pl-8 pr-2 outline-none border-[#D4D4D4] border rounded-sm'
								placeholder='Search Materials' />
						</div>
						<div ref={sortRef} className="flex relative">
							<button className={`self-center cursor-pointer rounded-sm ${openMenu === "sort" ? "bg-[#F5F5F5]" : ""}`}
								onClick={() => toggleMenu("sort")}>
								<Image alt="sort by" src="/console/sort.svg" width={25} height={25} />
							</button>
							<div className={`absolute top-10 bg-[#F5F5F5] rounded-sm shadow-sm transition-all ${openMenu === "sort"
										? "opacity-100 visible pointer-events-auto translate-y-0"
										: "opacity-0 invisible pointer-events-none -translate-y-2"}`}>
								{sorts.map(sort => (
									<button key={sort.key} onClick={() => {
											setSortKey(sort.key as any)
											setTimeout(() => setOpenMenu(null), 1000)
										}}
										className={`text-sm px-2 py-1 w-full text-left border-b border-[#E0E0E0] last:border-0 ${sortKey === sort.key ? "bg-[#E6E6E6] font-medium" : ""
											}`}>{sort.name}</button>))}
							</div>
						</div>
						<div ref={flipRef} className="flex relative">
							<button className={`self-center cursor-pointer rounded-sm ${openMenu === "flip" ? "bg-[#F5F5F5]" : ""}`}
								onClick={() => toggleMenu("flip")}>
								<Image alt="flip" src="/console/flip.svg" width={25} height={25} />
							</button>
							<div className={`absolute top-10 bg-[#F5F5F5] rounded-sm shadow-sm transition-all ${openMenu === "flip"
										? "opacity-100 visible pointer-events-auto translate-y-0"
										: "opacity-0 invisible pointer-events-none -translate-y-2"}`}>
								<button onClick={() => {
										setSortDirection("asc")
										setTimeout(() => setOpenMenu(null), 1000)
									}}
									className={`text-sm px-2 py-1 w-full text-left border-b border-[#E0E0E0] ${sortDirection === "asc" ? "bg-[#E6E6E6] font-medium" : ""}`}>
									Ascending
								</button>
								<button onClick={() => {
										setSortDirection("desc")
										setTimeout(() => setOpenMenu(null), 1000)
									}} className={`text-sm px-2 py-1 w-full text-left ${sortDirection === "desc" ? "bg-[#E6E6E6] font-medium" : ""}`}>Descending
								</button>
							</div>
						</div>
					</div>
					<button onClick={() => setFormOpen(true)}
						className='bg-[#444EAA] cursor-pointer hover:bg-[#414aa0] text-white sm:m-0 rounded-sm text-sm p-2 flex justify-center gap-2 items-center sm:w-[108px] w-[36px]'>
						<Image alt='plus' src='/console/smallplus.svg' width={10} height={10} />
						<span className='hidden sm:inline text-nowrap'>Add New</span>
					</button>
				</div>
				{!loading && !error && (
					<div className="flex flex-col space-y-2">
						{products.length === 0 ? (
							<div>No products found</div>
						) : (
							sortedProducts.map((product) => (
								<Row key={product.id} product={product} onStockChange={(id, newStock) => setProducts(prev =>
									prev.map(p => p.id === id ? { ...p, stock: newStock } : p))} />
							)))}
					</div>)}
				{loading && (
					<div className="flex flex-col space-y-3">
						{Array.from({ length: 8 }).map((_, i) => (
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