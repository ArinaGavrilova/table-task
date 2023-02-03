import { RootState } from '../../store';

export const selectItemsData = (state: RootState) => state.user?.items;
export const selectCurrentItemsData = (state: RootState) => state.user?.currentItems;
export const selectSortItemsData = (state: RootState) => state.user?.sortItems;
