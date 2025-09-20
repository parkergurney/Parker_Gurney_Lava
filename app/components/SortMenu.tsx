import React from 'react'
import Image from 'next/image'

const SortMenu = ({ sorts, sortKey, sortDirection, setSortKey, setSortDirection, openMenu, setOpenMenu }: any) => {
  return (
    <div>
      <div className="flex relative">
        <button className={`flex items-center gap-2 self-center cursor-pointer rounded-sm h-full ${openMenu === "flip" ? "bg-[#F5F5F5]" : ""}`}
          onClick={() => setOpenMenu("flip")}
          aria-haspopup="true" aria-expanded={openMenu === 'flip'}>
          <Image alt="sort direction" src="/console/flip.svg" width={24} height={24} />
        </button>
        <div className={`absolute top-10 right-0 bg-[#F5F5F5] rounded-sm shadow-sm transition-all p-1 ${openMenu === "flip"
          ? "opacity-100 visible pointer-events-auto translate-y-0"
          : "opacity-0 invisible pointer-events-none -translate-y-2"}`}>
          {sorts.map((sort: any, idx: any) => (
            <div key={sort.key} className={`flex items-center justify-between px-2 py-1 text-sm border-b border-[#E0E0E0] ${idx === sorts.length - 1 ? 'last:border-0' : ''}`}>
              <div className={`flex-1 text-left ${sortKey === sort.key ? 'font-medium' : ''}`}>
                {sort.name}
              </div>
              <div className='flex gap-1'>
                <button onClick={() => {
                  setSortKey(sort.key as any)
                  setSortDirection('asc')
                  setTimeout(() => setOpenMenu(null), 1000)
                }} className={`px-2 py-1 rounded-sm ${sortKey === sort.key && sortDirection === 'asc' ? 'bg-[#E6E6E6] font-medium' : 'bg-white'}`}>
                  ↑
                </button>
                <button onClick={() => {
                  setSortKey(sort.key as any)
                  setSortDirection('desc')
                  setTimeout(() => setOpenMenu(null), 1000)
                }} className={`px-2 py-1 rounded-sm ${sortKey === sort.key && sortDirection === 'desc' ? 'bg-[#E6E6E6] font-medium' : 'bg-white'}`}>
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SortMenu
