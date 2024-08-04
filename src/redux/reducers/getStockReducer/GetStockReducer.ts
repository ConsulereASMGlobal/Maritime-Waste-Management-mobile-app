import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface GetStockState {
  loading?: boolean;
  error?: string;
  stockList: Array<any>;
}

const initialState: GetStockState = {
  loading: false,
  error: '',
  stockList: []
};

export const getStockSlice = createSlice({
  name: 'getStocks',
  initialState,
  reducers: {
    getStock(state) {
      state.loading = true;
    },
    getStockSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.stockList = action?.payload?.data;
    },
    getStockFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action?.payload?.message;
    }
  }
});

//Reducer

const getStocksReducer = getStockSlice.reducer;
export default getStocksReducer;
