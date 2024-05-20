import 'bootstrap/dist/css/bootstrap.min.css';
import './css/my_reset.css';
import './css/App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './pages/Main';
import ShopAll from './pages/ShopAll';
import Product from './pages/Product';

import Company from './pages/Company';
import Ceo from './pages/Ceo';
import Organization from './pages/Organization';
import Ci from './pages/Ci';

import Cart from './pages/Cart';

import { useCallback, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

function App() {
  // useCallback(() => {},[])
  // 함수 재활용을 위해 사용 -> 메모이제이션 (기존의 최종 마지막본을 기억해두다가 변경되는 순간 작동)

  // APi call 함수

  // useEffect(() => {});
  // useEffect(() => {}, []);
  // useEffect(() => {}, [변수1, 변수2]);
  // useEffect(() => {return ()=>{컴포넌트가 제거될 때 1차 실행되는 곳}}, []);

  // useEffect 은 시간이 걸리는 것들을 담으면 된다
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} /> // 일종의 페이지
        <Route path="/shopall" element={<ShopAll />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/*  */}
        <Route path="/company" element={<Company />}>
          <Route path="ceo" element={<Ceo />} />
          <Route path="organization" element={<Organization />} />
          <Route path="ci" element={<Ci />} />
        </Route>
        <Route path="*" element={<h1>페이지가 없습니다.</h1>} />
      </Routes>
      {/* <Main products={products} /> */}
      <Footer />
    </div>
  );
}

export default App;
