'use client'

import {
  AlphabetFilter,
  alphabetFilter,
  PriceFilter,
  priceFilter,
} from '@/app/data/data'
import {
  clearFilter,
  setPriceFilter,
  setAlphabetFilter,
} from '@/app/redux/slices/joyasSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MobileFilters } from './MobileFilters'

export const Filters: React.FC = () => {
  const [alphabet, setAlphabet] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isAlphabetOpen, setIsAlphabetOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (order) {
      dispatch(setPriceFilter(order))
      dispatch(setAlphabetFilter(''))
    }
    if (alphabet) {
      dispatch(setAlphabetFilter(alphabet))
      dispatch(setPriceFilter(''))
    }
  }, [order, alphabet])

  return (
    <div className='flex md:flex-col text-gray-800 gap-4 w-auto bg-white p-4 shadow-md'>
      <div className='flex md:flex-col w-auto h-auto'>
        <div className='md:hidden flex'>
          <MobileFilters />
        </div>
        <div className='hidden gap-5 flex-col md:flex'>
          <h2 className='text-xl font-semibold mb-2'>Ordenar por:</h2>
          <div className='flex relative md:flex-col flex-row'>
            <button
              className='w-full text-left py-2 px-4 bg-gray-100 rounded flex justify-between items-center'
              onClick={() => setIsPriceOpen(!isPriceOpen)}
            >
              <span>Precio</span>
            </button>
            {isPriceOpen && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg'>
                {priceFilter.map((price: PriceFilter) => (
                  <button
                    key={price.value}
                    className='block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors'
                    onClick={() => {
                      setOrder(price.value)
                      setAlphabet('')
                      setIsPriceOpen(false)
                    }}
                  >
                    {price.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='relative'>
            <button
              className='w-full text-left py-2 px-4 bg-gray-100 rounded flex justify-between items-center'
              onClick={() => setIsAlphabetOpen(!isAlphabetOpen)}
            >
              <span>Alfabético</span>
              {/* <ChevronDown className={`transition-transform ${isAlphabetOpen ? 'transform rotate-180' : ''}`} /> */}
            </button>
            {isAlphabetOpen && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg'>
                {alphabetFilter.map((alph: AlphabetFilter) => (
                  <button
                    key={alph.value}
                    className='block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors'
                    onClick={() => {
                      setAlphabet(alph.value)
                      setOrder('')
                      setIsAlphabetOpen(false)
                    }}
                  >
                    {alph.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className='mt-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-opacity-90 transition-colors'
            onClick={() => {
              dispatch(clearFilter())
              setOrder('')
              setAlphabet('')
            }}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  )
}
