'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { fetchJoyasById } from '@/app/redux/slices/joyasSlice'
import { FaWhatsapp } from 'react-icons/fa'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function ProductDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()
  const { singleJoya, loading, error } = useSelector(
    (state: RootState) => state.joyas,
  )

  useEffect(() => {
    const numericId = Number(id)
    dispatch(fetchJoyasById(numericId))
  }, [dispatch])

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        Cargando...
      </div>
    )
  if (error)
    return (
      <div className='flex justify-center items-center h-screen text-red-500'>
        {error}
      </div>
    )
  if (!singleJoya)
    return (
      <div className='flex justify-center items-center h-screen'>
        Producto no encontrado
      </div>
    )

  const phoneNumber = '+59177389315'
  const createWhatsappLink = (message: string) =>
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen h-auto w-auto bg-[#f8f5f0] ${playfair.className}`}
    >
      <div className='flex flex-col lg:w-4/5 justify-center mx-auto px-4 pb-8'>
        <Link
          href='/'
          className='flex text-lg items-center text-gray-600 hover:text-gray-800 mb-8'
        >
          Volver al catálogo
        </Link>
        <div className='rounded-lg overflow-hidden md:w-auto shadow-xl h-3/4'>
          <div className='md:flex justify-center'>
            <div className='flex justify-start items-center w-full md:w-1/2 h-1/2 md:h-auto'>
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${singleJoya.Imagen[0].url}`}
                alt={singleJoya.Nombre}
                width={700}
                height={700}
                objectFit='cover'
                className='flex-1 h-full w-full object-cover'
              />
            </div>
            <div className='flex flex-col justify-center p-8 gap-4 w-auto'>
              <p className='text-gray-900 mb-4 text-3xl font-semibold'>
                {singleJoya.Nombre}
              </p>
              <p className='text-gray-600 mb-4'>Tipo: {singleJoya.Tipo}</p>
              <p className='text-3xl font-bold text-gray-900 mb-6'>
                {singleJoya.Precio} bs.
              </p>
              <a
                href={createWhatsappLink(
                  `Hola, deseo comprar ${singleJoya.Nombre}`,
                )}
                target='_blank'
                rel='noopener noreferrer'
                className='flex w-fit gap-2 items-center bg-lime-900 text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors'
              >
                <FaWhatsapp size={20} /> Deseo comprar esta joya
              </a>
              <a
                href={createWhatsappLink(
                  `Hola, quiero más información sobre ${singleJoya.Nombre}`,
                )}
                target='_blank'
                rel='noopener noreferrer'
                className='flex w-fit gap-2 items-center bg-lime-700 text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors'
              >
                <FaWhatsapp size={20} /> Más información
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
