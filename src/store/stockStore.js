import { createSlice } from '@reduxjs/toolkit';

export const stock = createSlice({
  name: 'stock',
  initialState: {
    pdstock: [10, 50, 30, 5, 4],
  },
});
