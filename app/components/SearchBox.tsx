import React from 'react'
import Image from 'next/image'

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  activeSuggestion,
  setActiveSuggestion,
}: any) => {
  return (
    <div>
      <div className='absolute left-2 top-[12px] pointer-events-none'>
        <Image alt='Search' src='./console/search.svg' width={14} height={14} className='pointer-events-none' />
      </div>
      <input type="text" className='h-[36px] w-full text-sm pl-8 pr-2 outline-none border-[#D4D4D4] border rounded-sm' placeholder='Search Materials'
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setShowSuggestions(true)
          setActiveSuggestion(-1)
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveSuggestion((prev: number) => Math.min(prev + 1, suggestions.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveSuggestion((prev: number) => Math.max(prev - 1, 0))
          } else if (e.key === 'Enter' && activeSuggestion >= 0) {
            e.preventDefault()
            setSearchQuery(suggestions[activeSuggestion])
            setShowSuggestions(false)
            setActiveSuggestion(-1)
          } else if (e.key === 'Escape') {
            setSearchQuery('')
            setShowSuggestions(false)
            setActiveSuggestion(-1)
          }
        }}
      />
      {showSuggestions && searchQuery.trim() !== '' && (
        <div className='absolute left-0 right-0 mt-1 bg-white border border-[#D5D5D5] rounded-sm shadow z-20 max-h-44 overflow-auto'>
          {suggestions.length === 0 ? (
            <div className='p-2 text-sm text-gray-500'>No results</div>
          ) : (
            suggestions.map((s: any, idx: any) => (
              <div key={s} className={`px-2 py-1 cursor-pointer ${idx === activeSuggestion ? 'bg-[#E6E6E6]' : ''}`}
                onMouseDown={(ev) => {
                  ev.preventDefault()
                  setSearchQuery(s)
                  setShowSuggestions(false)
                  setActiveSuggestion(-1)
                }}>{s}</div>
            )))}
        </div>
      )}
    </div>
  )
}

export default SearchBox
