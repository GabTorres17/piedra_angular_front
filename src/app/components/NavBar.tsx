'use client'

import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { clearFilter, setTypeFilter } from '../redux/slices/joyasSlice'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleFetchJewelry = (tipo: string | null) => {
    dispatch(clearFilter())
    dispatch(setTypeFilter(tipo))
  }

  const handleFetchAll = (tipo: string | null) => {
    dispatch(clearFilter())
    dispatch(setTypeFilter(tipo))
  }

  return (
    <div className='w-auto'>
      <div
        className={`flex h-auto w-auto items-center gap-10 pl-16 bg-[#ffffff] text-gray-950 ${playfair.className}`}
      >
        <div className='flex cursor-pointer'>
          <button onClick={() => handleFetchAll(null)}>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/piedra-angular-webapp.appspot.com/o/Logos%2FPiedra%20Angular%20-%20LOGO.jpg?alt=media&token=2001ee5f-c0b1-43ef-a3c0-526e6532d0cc'
              alt='Logo'
              width={200}
              height={200}
            />
          </button>
        </div>
        <button
          onClick={() => {
            handleFetchJewelry('Anillo')
          }}
          className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
        >
          Anillos
        </button>
        <button
          onClick={() => {
            handleFetchJewelry('Collar')
          }}
          className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
        >
          Collares
        </button>
        <button
          onClick={() => {
            handleFetchJewelry('Pulsera')
          }}
          className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
        >
          Pulseras
        </button>
        <button
          onClick={() => {
            handleFetchJewelry('Arete')
          }}
          className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
        >
          Aretes
        </button>
        <button
          onClick={() => {
            handleFetchJewelry('Tobillera')
          }}
          className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
        >
          Tobilleras
        </button>
        <button
          onClick={() => {
            handleFetchJewelry('Dije')
          }}
          className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
        >
          Dijes
        </button>
      </div>
    </div>
  )
}
