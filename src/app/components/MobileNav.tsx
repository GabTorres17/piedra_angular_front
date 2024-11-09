'use client'

import { Playfair_Display } from 'next/font/google'

import { useState } from 'react'
/* import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store' */
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { CiMenuBurger } from 'react-icons/ci'
import { subcategoriesRings, SubcategoriesRings } from '../data/data'

const playfair = Playfair_Display({ subsets: ['latin'] })
export const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openSecondSheet, setOpenSecondSheet] = useState(false)

  /*     const dispatch = useDispatch<AppDispatch>()
    
        const handleCloseMenu = () => {
            setIsOpen(false)
        }
    
        const handleFetchJewelry = (tipo: string | null) => {
            dispatch(clearFilter())
            dispatch(setTypeFilter(tipo))
            handleCloseMenu();
        } */

  return (
    <div className={`flex ${playfair.className}`}>
      <Sheet>
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
            <nav className='flex flex-col justify-center items-center gap-8'>
              <button
                onClick={() => {
                  setOpenSecondSheet(true)
                }}
              >
                Anillos
              </button>
            </nav>
            {openSecondSheet && (
              <Sheet open={openSecondSheet} onOpenChange={setOpenSecondSheet}>
                <SheetContent className='flex flex-col pt-24 left-0 text-black font-semibold'>
                  <nav className='flex flex-col justify-center items-center gap-8'>
                    <button
                      onClick={() => {
                        setOpenSecondSheet(false)
                      }}
                    >
                      Back
                    </button>
                    {subcategoriesRings.map((subring: SubcategoriesRings) => (
                      <button key={subring.value} onClick={() => {}}>
                        {subring.name}
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
