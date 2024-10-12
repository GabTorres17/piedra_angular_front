'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import { RootState, AppDispatch } from './redux/store'
import { fetchJoyas } from './redux/slices/joyasSlice'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Catalogo() {
  const dispatch = useDispatch<AppDispatch>()
  const { joyas, tipoFiltro } = useSelector((state: RootState) => state.joyas)

  useEffect(() => {
    dispatch(fetchJoyas(tipoFiltro))
  }, [dispatch, tipoFiltro])

  return (
    <div className={`min-h-screen bg-[#f8f5f0] ${playfair.className}`}>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {joyas.map((joya) => (
            <div
              key={joya.id}
              className='bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105'
            >
              <div className='relative h-64'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${joya.Imagen[0].url}`}
                  alt={joya.Nombre}
                  layout='fill'
                  objectFit='cover'
                  className='transition-opacity duration-300 hover:opacity-80'
                />
              </div>
              <div className='p-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                  {joya.Nombre}
                </h2>
                <p className='text-gray-600 mb-2'>Tipo: {joya.Tipo}</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {joya.Precio} bs.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
