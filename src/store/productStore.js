import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProductList = createAsyncThunk(
  'products/getProductList', // 액션의 이름
  async (category) => {
    let url = `https://my-json-server.typicode.com/leedbswo107/shoptest/products`;
    if (category) {
      url += `?category=${category}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const products = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    // 상태표시를 위한 state
    error: null,
    // 에러를 저장하는 공간.
  },
  reducers: {
    // 함수들이 존재하는 곳
    // 함수이름 : (state -> initialState 의 값이 들어감, action) => {},
    loadData: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    // createSlice에서 만든 객체를 만드는 부분
    builder
      .addCase(getProductList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// const [products, setProducts] = useState([]);
export const { extraReducers } = products.actions;
export default products;
