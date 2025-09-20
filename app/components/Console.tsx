import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Row from './Row'
import ProductForm from './ProductForm'
import SearchBox from './SearchBox'
import FilterMenu from './FilterMenu'
import SortMenu from './SortMenu'

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

type MenuType = 'sort' | 'flip' | null
type SortDirection = 'asc' | 'desc'
type StockFilter = 'all' | 'in' | 'out'

function useSuggestions(products: Product[], search: string) {
  return useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return []
    const seen = new Set<string>()
    return products
      .map(p => p.name)
      .filter(name => {
        const lower = name.toLowerCase()
        if (!lower.includes(q) || seen.has(lower)) return false
        seen.add(lower)
        return true
      })
      .slice(0, 50)
  }, [search, products])
}

function useSortedProducts(
  products: Product[],
  search: string,
  filters: { sizes: number[]; stock: StockFilter },
  sort: { key: keyof Product; direction: SortDirection }
) {
  return useMemo(() => {
    return products
      .filter(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
        if (filters.sizes.length > 0 && !filters.sizes.includes(Number(p.size))) return false
        if (filters.stock === 'in' && Number(p.stock) <= 0) return false
        if (filters.stock === 'out' && Number(p.stock) > 0) return false
        return true
      })
      .sort((a, b) => {
        const valA = String(a[sort.key]).toLowerCase()
        const valB = String(b[sort.key]).toLowerCase()
        const numA = +valA
        const numB = +valB
        if (!isNaN(numA) && !isNaN(numB)) {
          return sort.direction === 'asc' ? numA - numB : numB - numA
        }
        return sort.direction === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA)
      })
  }, [products, search, filters, sort])
}

const Console: React.FC<ConsoleProps> = ({ formOpen, setFormOpen }) => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [openMenu, setOpenMenu] = useState<MenuType>(null)
	const [sort, setSort] = useState<{ key: keyof Product; direction: SortDirection }>({ key: 'addedAt', direction: 'asc',})
	const [filters, setFilters] = useState<{ sizes: number[]; stock: StockFilter }>({sizes: [], stock: 'all',})
	const searchRef = useRef<HTMLDivElement>(null)
	const [search, setSearch] = useState({ query: '', showSuggestions: false, activeSuggestion: -1 })
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
	}, [formOpen])
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setSearch(prev => ({ ...prev, showSuggestions: false }))
			}
			if (openMenu) setOpenMenu(null)
		}
		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [openMenu])
	useEffect(() => {
		function handleGlobalKeydown(e: KeyboardEvent) {
			if (e.key === 'Enter') {
				setSearch(prev => ({ ...prev, showSuggestions: false, activeSuggestion: -1 }))
			}
		}
		document.addEventListener('keydown', handleGlobalKeydown)
		return () => document.removeEventListener('keydown', handleGlobalKeydown)
	}, [])
	const suggestions = useSuggestions(products, search.query)
	const sortedProducts = useSortedProducts(products, search.query, filters, sort)
	const sorts = [
		{ name: 'Date Added', key: 'addedAt' as const },
		{ name: 'Alphabetically', key: 'name' as const },
		{ name: 'Stock', key: 'stock' as const },
		{ name: 'Orders', key: 'orders' as const },
	]
	return (
		<div className=''>
			{formOpen && <ProductForm onClose={() => setFormOpen(false)} />}
			<div className={`w-full border border-[#D9D9D9] bg-white p-[12px] rounded-sm flex flex-col space-y-4
				${formOpen ? 'blur-sm transition-all' : 'blur-none transition-all'}`}>
				<div className='flex justify-between space-x-[12px] mr-0'>
					<div className='flex space-x-[4px] w-full justify-start items-center'>
						<div ref={searchRef} className='relative w-full sm:max-w-[360px] sm:mr-4'>
							<SearchBox searchQuery={search.query}
								setSearchQuery={(q: any) => setSearch(prev => ({ ...prev, query: q }))}
								suggestions={suggestions}
								showSuggestions={search.showSuggestions}
								setShowSuggestions={(s: any) => setSearch(prev => ({ ...prev, showSuggestions: s }))}
								activeSuggestion={search.activeSuggestion}
								setActiveSuggestion={(i: any) => setSearch(prev => ({ ...prev, activeSuggestion: i }))} />
						</div>
						<FilterMenu filters={filters} setFilters={setFilters} openMenu={openMenu} setOpenMenu={setOpenMenu} />
						<SortMenu
							sorts={sorts}
							sortKey={sort.key}
							sortDirection={sort.direction}
							setSortKey={(k: any) => setSort(prev => ({ ...prev, key: k }))}
							setSortDirection={(d: any) => setSort(prev => ({ ...prev, direction: d }))}
							openMenu={openMenu}
							setOpenMenu={setOpenMenu}
						/>
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