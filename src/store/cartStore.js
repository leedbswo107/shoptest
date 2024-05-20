// import { cartData } from './cartData';
import { createSlice } from '@reduxjs/toolkit';

const cartData = localStorage.getItem('cartData')
  ? JSON.parse(localStorage.getItem('cartData'))
  : [];
export const cart = createSlice({
  name: 'cart',
  initialState: cartData,
  reducers: {
    // 장바구니 관련 기능 개발
    // 1. 장바구니에 아이템 추가하기 -> Product.jsx 에서 사용할 함수부분
    addItem(state, action) {
      const num = state.findIndex((item) => item.id === action.payload.id);
      num === -1
        ? state.push(action.payload)
        : (state[num].count += action.payload.count);
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 2. 장바구니의 아이템 삭제하기 -> Cart.jsx 에서 사용할 함수부분
    deleteItem(state, action) {
      const num = state.findIndex((item) => item.id === action.payload);
      state.splice(num, 1);
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    // 3. 장바구니에서 수량이 변경될 때 함수; -> Cart.jsx 에서 사용할 함수부분
    addCount(state, action) {
      //    ㄴ 장바구니에서 수량이 증가할 때
      // state 는 cartData임
      const num = state.findIndex((item) => item.id === action.payload);
      state[num].count++;
      localStorage.setItem('cartData', JSON.stringify(state));
    },
    minCount(state, action) {
      //    ㄴ 장바구니에서 수량이 감소할 때
      // state 는 cartData임
      const num = state.findIndex((item) => item.id === action.payload);
      state[num].count--;
      localStorage.setItem('cartData', JSON.stringify(state));
    },
  },
  // reducer는 컴포넌트와 통신

  // JSON.parse(localStorage.getItem('cartData'))
  // 여기서 받아온걸 처리하는건 리듀서 밖에 함수를 설정함
});
export const { addCount, minCount, deleteItem, addItem } = cart.actions;
