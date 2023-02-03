import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Filter, FilterProperty } from './types';

const initialState: FilterSliceState = {
  filter: {
    name: 'name',
    filterProperty: FilterProperty.FILTER_NAME
  },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<Filter>) {
          state.filter = action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;