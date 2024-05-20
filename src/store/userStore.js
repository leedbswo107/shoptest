import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user', // 사용할 변수의 이름을 등록 (보관통)
  initialState: {
    // 변수 리스트를 등록하거나 외부에서 가져오는 부분
    username: '이윤재',
    age: 27,
  },
  reducers: {
    changeName: (state, action) => {
      state.username = action.payload;
    },
    // changeName(기존에 있던거, 매개변수로 가져온 것) => {}
    changeAge: (state, action) => {
      state.age += action.payload;
    },
  },
});
export const { changeName, changeAge } = user.actions;
