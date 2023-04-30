import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IPlatformData {
  platform: { name: string };
}

export interface IGameData {
  id: number;
  background_image: string;
  name: string;
  platforms: IPlatformData[] | null;
}

export interface ISearchData {
  count: number;
  results: IGameData[];
  next: string | null;
  prev: string | null;
}

export interface ISearchState {
  data: ISearchData | null;
  isLoading: boolean;
  error: any | null;
  queryString: string | null;
}

const initialState: ISearchState = {
  data: null,
  isLoading: false,
  error: null,
  queryString: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    getResultsStart: state => {
      state.isLoading = true;
    },
    getResultsSuccess: (state, action: PayloadAction<ISearchData>) => {
      state.isLoading = false;

      const { count, results, next, prev } = action.payload;
      state.data = { count, results, next, prev };

      state.error = null;
    },
    getResultsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCurrentQueryString: (state, action: PayloadAction<string>) => {
      state.queryString = action.payload;
    },
  },
});

export const { getResultsStart, getResultsSuccess, getResultsError, getCurrentQueryString } = searchSlice.actions;
export default searchSlice.reducer;
