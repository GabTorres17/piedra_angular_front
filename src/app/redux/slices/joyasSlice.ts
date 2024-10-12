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
  joyas: Joya[]
  loading: boolean
  error: string | null
  tipoFiltro: string | null
}

const initialState: JoyasState = {
  joyas: [],
  loading: false,
  error: null,
  tipoFiltro: null,
}

export const fetchJoyas = createAsyncThunk(
  'joyas/fetchJoyas',
  async (tipoFiltro: string | null) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/joyas?populate=Imagen`
    if (tipoFiltro) {
      url += `&filters[Tipo][$eq]=${tipoFiltro}`
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

const joyasSlice = createSlice({
  name: 'joyas',
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.joyas = []
      state.loading = false
      state.error = null
    },
    setTipoFiltro: (state, action) => {
      state.tipoFiltro = action.payload
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
  },
})

export const { clearFilter } = joyasSlice.actions
export const { setTipoFiltro } = joyasSlice.actions

export default joyasSlice.reducer
