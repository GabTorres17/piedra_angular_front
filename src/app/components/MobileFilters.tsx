'use client'

import { alphabetFilter, priceFilter } from '@/app/data/data'
import {
  clearFilter,
  setPriceFilter,
  setAlphabetFilter,
} from '@/app/redux/slices/joyasSlice'
import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export const MobileFilters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [alphabet, setAlphabet] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isAlphabetOpen, setIsAlphabetOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (order) {
      dispatch(setPriceFilter(order))
      dispatch(setAlphabetFilter(''))
      handleCloseMenu()
    }
    if (alphabet) {
      dispatch(setAlphabetFilter(alphabet))
      dispatch(setPriceFilter(''))
      handleCloseMenu()
    }
  }, [order, alphabet])

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger
          className='flex justify-center items-center'
          onClick={() => setIsOpen(true)}
        >
          <div className='text-[32px]'>
            <FaFilter size={25} />
          </div>
        </SheetTrigger>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className='flex flex-col pt-24 text-black font-medium'>
            <nav className='flex flex-col justify-center items-center gap-8'>
              <span className='font-semibold'>Ordenar por:</span>
              <button
                className='text-left py-2 px-4 bg-gray-100 rounded flex justify-between items-center'
                onClick={() => setIsPriceOpen(!isPriceOpen)}
              >
                <span>Precio</span>
                <span
                  className={`transform transition-transform ${isPriceOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  ▼
                </span>
              </button>
              {isPriceOpen && (
                <div className='flex flex-col bg-white border border-gray-200 rounded shadow-lg mt-2'>
                  {priceFilter.map((price) => (
                    <div
                      key={price.value}
                      className='py-2 px-4 text-left hover:bg-gray-100'
                      onClick={() => {
                        setOrder(price.value)
                        setAlphabet('')
                        setIsPriceOpen(false)
                      }}
                    >
                      {price.name}
                    </div>
                  ))}
                </div>
              )}
              <button
                className='text-left py-2 px-4 bg-gray-100 rounded flex justify-between items-center'
                onClick={() => setIsAlphabetOpen(!isAlphabetOpen)}
              >
                <span>Alfabético</span>
                <span
                  className={`transform transition-transform ${isAlphabetOpen ? 'rotate-180' : 'rotate-0'}`}
                >
                  ▼
                </span>
              </button>
              {isAlphabetOpen && (
                <div className='flex flex-col bg-white border border-gray-200 rounded shadow-lg mt-2'>
                  {alphabetFilter.map((alph) => (
                    <div
                      key={alph.value}
                      className='py-2 px-4 text-left hover:bg-gray-100'
                      onClick={() => {
                        setAlphabet(alph.value)
                        setOrder('')
                        setIsAlphabetOpen(false)
                      }}
                    >
                      {alph.name}
                    </div>
                  ))}
                </div>
              )}
              <div
                className='mt-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-opacity-90 transition-colors'
                onClick={() => {
                  dispatch(clearFilter())
                  setOrder('')
                  setAlphabet('')
                  handleCloseMenu()
                }}
              >
                Limpiar filtros
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </Sheet>
    </div>
  )
}
