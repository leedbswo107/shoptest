import { useEffect, useState } from 'react';
import ListCard from '../components/ListCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../store/productStore';

const ShopAll = () => {
  const productsState = useSelector((state) => state.products);
  const products = productsState.products;
  const [list, setList] = useState(products);
  const dispatchData = (category) => {
    dispatch(getProductList(category));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatchData('');
  }, [dispatch]);

  useEffect(() => {
    setList(products);
  }, [products]);

  const sortProducts = (type) => {
    let sortList = [...list];
    switch (type) {
      case 'lowPrice':
        sortList.sort((a, b) => a.price - b.price);
        break;
      case 'highPrice':
        sortList.sort((a, b) => b.price - a.price);
        break;
      case 'highDiscount':
        sortList.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    setList(sortList);
  };
  return (
    <main className="mw shopall">
      <h2>ShopAll</h2>
      <nav>
        <button
          onClick={() => {
            dispatchData('');
          }}
        >
          모든상품
        </button>
        <button
          onClick={() => {
            dispatchData('new');
          }}
        >
          신상품
        </button>
        <button
          onClick={() => {
            dispatchData('top');
          }}
        >
          인기상품
        </button>
        <hr />
        <button
          onClick={() => {
            sortProducts('lowPrice');
          }}
        >
          낮은가격순
        </button>
        <button
          onClick={() => {
            sortProducts('highPrice');
          }}
        >
          높은가격순
        </button>
        <button
          onClick={() => {
            sortProducts('highDiscount');
          }}
        >
          높은할인율
        </button>
      </nav>
      <ul className="listCon">
        {list.map((product) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ShopAll;
