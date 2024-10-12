import { configureStore } from '@reduxjs/toolkit'
import joyasReducer from './slices/joyasSlice'

export const store = configureStore({
  reducer: {
    joyas: joyasReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
