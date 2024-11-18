'use client'

import { Playfair_Display } from 'next/font/google'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { CiMenuBurger } from 'react-icons/ci'
import { Jewelry, jewelry, Subcategory } from '../data/data'
import {
  clearFilter,
  setSubtypeFilter,
  setTypeFilter,
} from '../redux/slices/joyasSlice'
import { useRouter } from 'next/navigation'
import { getDynamicPrefix } from '../hooks/getDynamicPrefix'

const playfair = Playfair_Display({ subsets: ['latin'] })
export const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openSecondSheet, setOpenSecondSheet] = useState(false)
  const [subcategoryValues, setSubcategoryValues] = useState<Subcategory[]>([])
  const [parentType, setParentType] = useState<Jewelry | null>(null)

  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const handleFetchAll = (tipo: string | null) => {
    router.push('/')
    dispatch(clearFilter())
    dispatch(setTypeFilter(tipo))
    handleCloseMenu()
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  const handleFetchType = (tipo: string | null) => {
    dispatch(clearFilter())
    dispatch(setTypeFilter(tipo))
    handleCloseMenu()
  }

  const handleFetchSubtype = (subtipo: string | null) => {
    dispatch(clearFilter())
    dispatch(setSubtypeFilter(subtipo))
    handleCloseMenu()
  }

  return (
    <div className={`flex ${playfair.className}`}>
      <Sheet>
        <SheetTitle></SheetTitle>
        <SheetTrigger
          className='flex justify-center items-center'
          onClick={() => setIsOpen(true)}
        >
          <div className='text-[32px]'>
            <CiMenuBurger />
          </div>
        </SheetTrigger>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className='flex flex-col pt-24 text-black font-semibold'>
            <button
              className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
              onClick={() => {
                handleFetchAll(null)
              }}
            >
              Todas las joyas
            </button>
            {jewelry.map((jewel: Jewelry, index) => (
              <nav
                key={index}
                className='cursor-pointer justify-center relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
              >
                <button
                  onClick={() => {
                    setSubcategoryValues(jewel.nested)
                    setParentType(jewel)
                    setOpenSecondSheet(true)
                  }}
                >
                  {jewel.name}
                </button>
              </nav>
            ))}

            {openSecondSheet && parentType && (
              <Sheet open={openSecondSheet} onOpenChange={setOpenSecondSheet}>
                <SheetContent className='flex flex-col pt-24 left-0 text-black font-semibold'>
                  <nav className='flex flex-col justify-center items-center gap-8'>
                    <button
                      className='cursor-pointer relative px-4 py-5 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
                      onClick={() => {
                        handleFetchType(parentType.value)
                        setOpenSecondSheet(false)
                      }}
                    >
                      {`${getDynamicPrefix(parentType.name)} ${parentType.name.toLowerCase()}`}
                    </button>
                    {subcategoryValues.map((sub, idx) => (
                      <button
                        className='cursor-pointer relative px-4 py-3 duration-350 before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-100 hover:before:left-0 hover:before:w-full'
                        key={idx}
                        onClick={() => {
                          handleFetchSubtype(sub.value)
                          setOpenSecondSheet(false)
                        }}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </SheetContent>
        </Sheet>
      </Sheet>
    </div>
  )
}
