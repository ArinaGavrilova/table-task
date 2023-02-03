import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageCountSliceState } from './types';

const initialState: PageCountSliceState = {
  currentPage: 1,
};

const PageCountSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = PageCountSlice.actions;

export default PageCountSlice.reducer;