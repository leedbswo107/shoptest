import { useEffect } from 'react';
import Banner from '../components/Banner';
import MainList from '../components/MainList';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../store/productStore';

const Main = () => {
  const productsState = useSelector((state) => state.products);
  // state.products 의 products 는 store에서 가져온것임
  const products = productsState.products;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList('new'));
  }, [dispatch]);

  if (productsState.status !== 'success') {
    return <>loading...</>;
  }

  return (
    <main className="mw">
      <Banner />
      <MainList products={products} />
    </main>
  );
};

export default Main;
