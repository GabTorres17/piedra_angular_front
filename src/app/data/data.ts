export interface PriceFilter {
  name: string
  value: string
}

export interface AlphabetFilter {
  name: string
  value: string
}

export interface Subcategory {
  name: string
  value: string
}
export interface Jewelry {
  name: string
  value: string
  id: string
  nested: Subcategory[]
}

export interface SubcategoriesDeals {
  name: string
  value: string
}

export interface SubcategoriesRings {
  name: string
  value: string
}

export interface SubcategoriesCollars {
  name: string
  value: string
}

export interface SubcategoriesBracelets {
  name: string
  value: string
}

export interface SubcategoriesEarrings {
  name: string
  value: string
}

export interface SubcategoriesAnklets {
  name: string
  value: string
}

export interface SubcategoriesCharms {
  name: string
  value: string
}

export const priceFilter: PriceFilter[] = [
  {
    name: 'Mayor a menor',
    value: 'desc',
  },
  {
    name: 'Menor a mayor',
    value: 'asc',
  },
]
export const alphabetFilter: AlphabetFilter[] = [
  {
    name: 'A-Z',
    value: 'asc',
  },
  {
    name: 'Z-A',
    value: 'desc',
  },
]

export const subcategoriesDeals: SubcategoriesDeals[] = [
  {
    name: 'Anillos para varón',
    value: 'PromoAnillosHombre',
  },
  {
    name: 'Cadenas con dije para varón',
    value: 'PromoCadenasDijeHombre',
  },
  {
    name: 'Anillos para mujer',
    value: 'PromoAnillosMujer',
  },
  {
    name: 'Cadenas con dije para mujer',
    value: 'PromoCadenasDijeMujer',
  },
]

export const subcategoriesRings: SubcategoriesRings[] = [
  {
    name: 'Anillos de mujer',
    value: 'AnillosMujer',
  },
  {
    name: 'Anillos de hombre',
    value: 'AnillosHombre',
  },
  {
    name: 'Anillos Pandora',
    value: 'AnillosPandora',
  },
]
export const subcategoriesCollars: SubcategoriesCollars[] = [
  {
    name: 'Cadenas de mujer',
    value: 'CadenasMujer',
  },
  {
    name: 'Cadenas de hombre',
    value: 'CadenasHombre',
  },
  {
    name: 'Cadenas de mujer con dije',
    value: 'CadenasMujerDije',
  },
  {
    name: 'Juego cadena, aros y dije',
    value: 'CadenaArosDije',
  },
]
export const subcategoriesBracelets: SubcategoriesBracelets[] = [
  {
    name: 'Manillas de mujer',
    value: 'ManillasMujer',
  },
  {
    name: 'Manillas de hombre',
    value: 'ManillasHombre',
  },
  {
    name: 'Manillas Pandora',
    value: 'ManillasPandora',
  },
]
export const subcategoriesEarrings: SubcategoriesEarrings[] = [
  {
    name: 'Aros aguja o botón',
    value: 'ArosAgujaBoton',
  },
  {
    name: 'Aros cortos',
    value: 'ArosCortos',
  },
  {
    name: 'Aros largos',
    value: 'ArosLargos',
  },
  {
    name: 'Argollas',
    value: 'Argolas',
  },
  {
    name: 'Aros Pandora',
    value: 'ArosPandora',
  },
]
export const subcategoriesAnklets: SubcategoriesAnklets[] = [
  {
    name: '',
    value: '',
  },
]
export const subcategoriesCharms: SubcategoriesCharms[] = [
  {
    name: 'Dijes de mujer',
    value: 'DijesMujer',
  },
  {
    name: 'Dijes de hombre',
    value: 'DijesHombre',
  },
  {
    name: 'Dijes Pandora',
    value: 'DijesPandora',
  },
]

export const jewelry: Jewelry[] = [
  {
    name: 'Promociones',
    value: 'promociones',
    id: 'promociones',
    nested: subcategoriesDeals,
  },
  {
    name: 'Anillos',
    value: 'anillo',
    id: 'anillo',
    nested: subcategoriesRings,
  },
  {
    name: 'Collares',
    value: 'collar',
    id: 'collar',
    nested: subcategoriesCollars,
  },
  {
    name: 'Pulseras',
    value: 'pulsera',
    id: 'pulsera',
    nested: subcategoriesBracelets,
  },
  {
    name: 'Aretes',
    value: 'arete',
    id: 'arete',
    nested: subcategoriesEarrings,
  },
  {
    name: 'Tobilleras',
    value: 'tobillera',
    id: 'tobillera',
    nested: subcategoriesAnklets,
  },
  {
    name: 'Dijes',
    value: 'dije',
    id: 'dije',
    nested: subcategoriesCharms,
  },
]
