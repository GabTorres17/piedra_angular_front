'use client'

import { Jewelry, jewelry } from '../data/data'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import {
  clearFilter,
  setSubtypeFilter,
  setTypeFilter,
} from '../redux/slices/joyasSlice'
import { MobileNavBar } from './MobileNav'
import { useRouter } from 'next/navigation'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const NavBar = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleFetchJewelry = (tipo: string | null) => {
    router.push('/')
    dispatch(clearFilter())
    dispatch(setTypeFilter(tipo))
  }

  const handleFetchAll = (tipo: string | null) => {
    router.push('/')
    dispatch(clearFilter())
    dispatch(setTypeFilter(tipo))
  }

  const handleFetchSubtype = (subtipo: string | null) => {
    dispatch(clearFilter())
    dispatch(setSubtypeFilter(subtipo))
  }

  return (
    <div className='w-full'>
      <div
        className={`flex h-[68px] w-full justify-between md:justify-around items-center gap-10 sm:pl-8 md:pl-12 bg-[#ffffff] text-gray-950 ${playfair.className}`}
      >
        <div className='flex flex-start'>
          <Image
            alt='Logo'
            height={200}
            src='https://firebasestorage.googleapis.com/v0/b/piedra-angular-webapp.appspot.com/o/Logos%2FPiedra%20Angular%20-%20LOGO.jpg?alt=media&token=2001ee5f-c0b1-43ef-a3c0-526e6532d0cc'
            width={200}
          />
        </div>
        <div className='flex md:hidden pr-5'>
          <MobileNavBar />
        </div>
        <div className='hidden md:flex md:gap-2 lg:gap-6'>
          <button
            className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
            onClick={() => handleFetchAll(null)}
          >
            Todos
          </button>
          {jewelry.map((jewel: Jewelry) => (
            <div key={jewel.value} className='relative group z-50'>
              <button
                onClick={() => {
                  handleFetchJewelry(`${jewel.value}`)
                }}
                className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
              >
                {jewel.name}
              </button>
              {jewel.nested && jewel.nested.length > 0 && (
                <div className='absolute right-0 hidden w-[200px] bg-white border border-gray-200 shadow-md group-hover:block'>
                  <button
                    onClick={() => handleFetchJewelry(jewel.value)}
                    className='block w-full px-4 py-2 text-left hover:bg-gray-100'
                  >
                    {`Todos/as ${jewel.name.toLowerCase()}`}
                  </button>
                  <hr className='my-1' />
                  {jewel.nested.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFetchSubtype(sub.value)}
                      className='block w-full px-4 py-2 text-left hover:bg-gray-100'
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
