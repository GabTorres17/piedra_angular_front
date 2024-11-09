import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Imagen {
  id: number
  url: string
}

interface Joya {
  id: number
  Nombre: string
  Imagen: Imagen[]
  Precio: number
  Tipo: string
}

interface JoyasState {
  joyas: Joya[] | null
  singleJoya: Joya | null
  loading: boolean
  error: string | null
  typeFilter: string | null
  priceFilter: 'asc' | 'desc' | null
  alphabetFilter: 'asc' | 'desc' | null
  filter: Joya[]
}

const initialState: JoyasState = {
  joyas: null,
  singleJoya: null,
  loading: false,
  error: null,
  typeFilter: null,
  priceFilter: null,
  alphabetFilter: null,
  filter: [],
}

export const fetchJoyas = createAsyncThunk(
  'joyas/fetchJoyas',
  async ({
    typeFilter,
    priceFilter,
    alphabetFilter,
  }: {
    typeFilter?: string | null
    priceFilter?: 'asc' | 'desc' | null
    alphabetFilter?: 'asc' | 'desc' | null
  }) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/joyas?populate=Imagen`
    if (typeFilter) {
      url += `&filters[categoria][Name][$eq]=${typeFilter}`
    }

    if (priceFilter) {
      url += `&sort=Precio:${priceFilter}`
    }

    if (alphabetFilter) {
      url += `&sort=Nombre:${alphabetFilter}`
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    })
    const joyasData = response.data.data

    if (!joyasData || !Array.isArray(joyasData)) {
      console.error('Unexpected API response format:', response.data)
      return []
    }

    return joyasData.map((item: Joya) => ({
      id: item.id ?? 0,
      Nombre: item?.Nombre || 'Desconocido',
      Imagen:
        item?.Imagen?.map((img: Imagen) => ({
          id: img.id ?? 0,
          url: img?.url || '',
        })) || [],
      Precio: item?.Precio || 0,
      Tipo: item?.Tipo || 'Desconocido',
    }))
  },
)

export const fetchJoyasById = createAsyncThunk(
  'joyas/fetchJoyasById',
  async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/joyas/?populate=Imagen&filters[id][$eq]=${id}`

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    })
    const joyaData = response.data.data[0]

    if (!joyaData) {
      console.error('Unexpected API response format:', response.data)
      return null
    }

    return {
      id: joyaData.id ?? 0,
      Nombre: joyaData?.Nombre || 'Desconocido',
      Imagen:
        joyaData?.Imagen?.map((img: Imagen) => ({
          id: img.id ?? 0,
          url: img?.url || '',
        })) || [],
      Precio: joyaData?.Precio || 0,
      Tipo: joyaData?.Tipo || 'Desconocido',
    }
  },
)

const joyasSlice = createSlice({
  name: 'joyas',
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.priceFilter = null
      state.alphabetFilter = null
      state.loading = false
      state.error = null
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload
    },
    setAlphabetFilter: (state, action) => {
      state.alphabetFilter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoyas.pending, (state) => {
        console.log('Fetching joyas...')
        state.loading = true
        state.error = null
      })
      .addCase(fetchJoyas.fulfilled, (state, action) => {
        console.log('Fetch successful, joyas:', action.payload)
        state.loading = false
        state.joyas = action.payload
      })
      .addCase(fetchJoyas.rejected, (state, action) => {
        console.log('Fetch failed, error:', action.error.message)
        state.loading = false
        state.error = action.error.message || 'Error fetching joyas'
      })
      .addCase(fetchJoyasById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJoyasById.fulfilled, (state, action) => {
        console.log('Fetch successful, joya:', action.payload)
        state.loading = false
        state.singleJoya = action.payload
        state.joyas = null
        /*         if (Array.isArray(action.payload)) {
                  state.joyas = action.payload;
                  state.singleJoya = null;
                } else {
                  state.singleJoya = action.payload;
                  state.joyas = null;
                } */
      })
      .addCase(fetchJoyasById.rejected, (state, action) => {
        console.log('Fetch by ID failed, error:', action.error.message)
        state.loading = false
        state.error = action.error.message || 'Error fetching joya by ID'
      })
  },
})

export const { clearFilter } = joyasSlice.actions
export const { setTypeFilter } = joyasSlice.actions
export const { setPriceFilter } = joyasSlice.actions
export const { setAlphabetFilter } = joyasSlice.actions

export default joyasSlice.reducer
