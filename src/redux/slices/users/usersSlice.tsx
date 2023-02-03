import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { User, UserSliceState, Status } from './types';

export const fetchUser = createAsyncThunk<User[], void> (
  'user/fetch', 
  async () => {
    const { data } = await axios.get<User[]> ('https://retoolapi.dev/eqsQ4S/users');

  return data;
},
);

const initialState: UserSliceState = {
    items: [],
    sortItems: [],
    currentItems: [],
    status: Status.LOADING,
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setCurrentItem(state, action: PayloadAction<{from: number, to?: number }>) {
        state.currentItems = state.items.slice(action.payload.from, action.payload?.to);
      },
      removeItems(state, action: PayloadAction<number | string>) {
        state.items = state.items.filter((el) => el.id !== action.payload);
      },
      editItems(state, action: PayloadAction<User>) {
        state.items = state.items.map((el) => action.payload.id === el.id ? action.payload : el)
      },
      addItems(state, action: PayloadAction<User>) {
        state.items.push(action.payload);
      },
      setSortItems(state, action:PayloadAction<string>) {
        state.sortItems = state.items.sort((a: any, b: any) => a[action.payload] > b[action.payload] ? 1 : -1)
      },
      clearSortItems(state) {
        state.sortItems = [];
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
          state.status = Status.LOADING;
        });
    
        builder.addCase(fetchUser.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = Status.SUCCESS;
        });
    
        builder.addCase(fetchUser.rejected, (state) => {
          state.status = Status.ERROR;
        });
      },
});

export const { setCurrentItem, removeItems, addItems, editItems, setSortItems, clearSortItems } = userSlice.actions;

export default userSlice.reducer;