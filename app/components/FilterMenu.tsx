import React from 'react'
import Image from 'next/image'

const FilterMenu = ({ filters, setFilters, openMenu, setOpenMenu }: any) => {
  const sizeLabels = ['Small', 'Medium', 'Large']
  return (
    <div>
      <div className="flex relative">
        <button className={`flex items-center gap-2 self-center cursor-pointer rounded-sm h-full ${openMenu === "sort" ? "bg-[#F5F5F5]" : ""}`}
          onClick={() => setOpenMenu("sort")}
          aria-haspopup="true" aria-expanded={openMenu === 'sort'}>
          <Image alt="filter" src="/console/sort.svg" width={24} height={24} />
        </button>
        <div className={`absolute top-10 left-0 bg-[#F5F5F5] rounded-sm shadow-sm p-2 transition-all ${openMenu === "sort"
          ? "opacity-100 visible pointer-events-auto translate-y-0"
          : "opacity-0 invisible pointer-events-none -translate-y-2"}`}>
          <div className='text-xs font-medium mb-2'>Filter by size</div>
          <div className='flex flex-col space-y-1'>
            {[1, 2, 3].map((size: any) => (
              <label key={size} className='flex items-center gap-2 text-sm px-1'>
                <input type='checkbox' checked={filters.sizes.includes(size)}
                  onChange={() =>
                    setFilters((prev: any) => ({
                      ...prev,
                      sizes: prev.sizes.includes(size)
                        ? prev.sizes.filter((s: any) => s !== size)
                        : [...prev.sizes, size],
                    }))} />
                <span>{sizeLabels[size - 1]}</span>
              </label>))}
            <div className='mt-2 text-xs font-medium'>Stock</div>
            {[{ label: 'In stock', value: 'in' }, { label: 'Out of stock', value: 'out' },].map(opt => (
              <label key={opt.value} className='flex items-center gap-2 text-sm px-1'>
                <input type='checkbox' checked={filters.stock === opt.value}
                  onChange={() =>
                    setFilters((prev: any) => ({
                      ...prev,
                      stock: prev.stock === opt.value ? 'all' : (opt.value),
                    }))} />
                <span className='text-nowrap'>{opt.label}</span>
              </label>))}
            <div className='flex gap-2 mt-2'>
              <button onClick={() => setFilters({ sizes: [], stock: 'all' })} className='text-xs px-2 py-1 bg-white rounded-sm border'>Clear</button>
              <button onClick={() => setOpenMenu(null)} className='text-xs px-2 py-1 bg-white rounded-sm border'>Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterMenu
