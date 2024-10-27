/* 'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { fetchJoyaById } from '@/app/redux/slices/joyasSlice'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function ProductDetail() {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { selectedJoya, loading, error } = useSelector((state: RootState) => state.joyas)

    useEffect(() => {
        if (id) {
            dispatch(fetchJoyaById(id as string))
        }
    }, [dispatch, id])

    if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
    if (!selectedJoya) return <div className="flex justify-center items-center h-screen">Producto no encontrado</div>

    return (
        <div className={`min-h-screen bg-[#f8f5f0] ${playfair.className}`}>
            <div className="container mx-auto px-4 py-16">
                <Link href="/catalogo" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8">
                    <ArrowLeft className="mr-2" />
                    Volver al catálogo
                </Link>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedJoya.Imagen[0].url}`}
                                alt={selectedJoya.Nombre}
                                width={500}
                                height={500}
                                objectFit="cover"
                                className="w-full h-96 md:h-full md:w-96 object-cover"
                            />
                        </div>
                        <div className="p-8">
                            <h1 className="text-3xl font-semibold text-gray-800 mb-4">{selectedJoya.Nombre}</h1>
                            <p className="text-gray-600 mb-4">Tipo: {selectedJoya.Tipo}</p>
                            <p className="text-gray-600 mb-4">Material: {selectedJoya.Material}</p>
                            <p className="text-3xl font-bold text-gray-900 mb-6">{selectedJoya.Precio} bs.</p>
                            <p className="text-gray-700 mb-6">{selectedJoya.Descripcion}</p>
                            <button className="bg-gold text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} */
