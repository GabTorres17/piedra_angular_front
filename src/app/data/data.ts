export interface PriceFilter {
  name: string
  value: string
}

export interface AlphabetFilter {
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
