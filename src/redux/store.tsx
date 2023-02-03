import { configureStore } from '@reduxjs/toolkit';
import user from './slices/users/usersSlice';
import pages from './slices/pageCount/pageCountSlice'
import filters from './slices/filters/filtersSlice'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user,
    pages,
    filters
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();