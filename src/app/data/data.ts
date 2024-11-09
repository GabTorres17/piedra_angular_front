export interface PriceFilter {
  name: string
  value: string
}

export interface AlphabetFilter {
  name: string
  value: string
}

export interface Jewelry {
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
export const jewelry: Jewelry[] = [
  {
    name: 'Anillos',
    value: 'anillo',
  },
  {
    name: 'Collares',
    value: 'collar',
  },
  {
    name: 'Pulseras',
    value: 'pulsera',
  },
  {
    name: 'Aretes',
    value: 'arete',
  },
  {
    name: 'Tobilleras',
    value: 'tobillera',
  },
  {
    name: 'Dijes',
    value: 'dije',
  },
]

export const subcategoriesRings: SubcategoriesRings[] = [
  {
    name: 'Anillos de mujer',
    value: 'AnillosMujer',
  },
]
export const subcategoriesCollars: SubcategoriesCollars[] = [
  {
    name: '',
    value: '',
  },
]
export const subcategoriesBracelets: SubcategoriesBracelets[] = [
  {
    name: '',
    value: '',
  },
]
export const subcategoriesEarrings: SubcategoriesEarrings[] = [
  {
    name: '',
    value: '',
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
    name: '',
    value: '',
  },
]
