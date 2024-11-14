'use client'

import { Playfair_Display } from 'next/font/google'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { CiMenuBurger } from 'react-icons/ci'
import { Jewelry, jewelry, Subcategory } from '../data/data'
import { clearFilter, setSubtypeFilter } from '../redux/slices/joyasSlice'

const playfair = Playfair_Display({ subsets: ['latin'] })
export const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openSecondSheet, setOpenSecondSheet] = useState(false)
  const [subcategoryValues, setSubcategoryValues] = useState<Subcategory[]>([])

  const dispatch = useDispatch<AppDispatch>()

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  /*   const handleFetchType = (tipo: string | null) => {
      dispatch(clearFilter())
      dispatch(setTypeFilter(tipo))
      handleCloseMenu();
    } */

  const handleFetchSubtype = (subtipo: string | null) => {
    dispatch(clearFilter())
    dispatch(setSubtypeFilter(subtipo))
    handleCloseMenu()
  }

  return (
    <div className={`flex ${playfair.className}`}>
      <Sheet>
        <SheetTitle>Hola</SheetTitle>
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
            {jewelry.map((jewel: Jewelry, index) => (
              <nav
                key={index}
                className='flex flex-col justify-center items-center gap-8'
              >
                <button
                  onClick={() => {
                    setSubcategoryValues(jewel.nested)
                    setOpenSecondSheet(true)
                  }}
                >
                  {jewel.name}
                </button>
              </nav>
            ))}

            {openSecondSheet && (
              <Sheet open={openSecondSheet} onOpenChange={setOpenSecondSheet}>
                <SheetContent className='flex flex-col pt-24 left-0 text-black font-semibold'>
                  <nav className='flex flex-col justify-center items-center gap-8'>
                    {subcategoryValues.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleFetchSubtype(sub.value)
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
