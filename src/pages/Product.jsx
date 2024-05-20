import { Tab, Tabs, Button, Modal } from 'react-bootstrap';
import style from '../css/Detail.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListCard from '../components/ListCard';
import { addItem } from '../store/cartStore';
import { useDispatch } from 'react-redux';

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProducts] = useState(null);
  const [similarList, setSimilarList] = useState([]);
  let [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const increment = () => setCount(count++);
  const decrement = () => {
    if (count <= 0) {
    }
    setCount(count--);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // id가 일치하는 하나의 상품
  const getProductList = async () => {
    const url = `https://my-json-server.typicode.com/leedbswo107/shoptest/products/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data);

    const url2 = `https://my-json-server.typicode.com/leedbswo107/shoptest/products?category=${data.category}`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    setSimilarList(data2);
  };
  useEffect(() => {
    getProductList();
  }, [id]);
  console.log(product);
  return (
    <main className="mw">
      <h2>상품 상세페이지</h2>
      <section className={style.productCon}>
        <div className={style.imgCon}>
          <img src={`/img/${product?.img}`} alt={product?.title} />
        </div>
        <div className={style.pInfo}>
          <p>products : {product?.title}</p>
          <p>price : ${parseInt(product?.price, 10).toLocaleString()}</p>
          <p>discount : - %{product?.discount}</p>
          <div className={style.count}>
            <span>수량</span>
            {count === 1 ? (
              <button onClick={decrement} disabled>
                -
              </button>
            ) : (
              <button onClick={decrement}>-</button>
            )}
            <span>{count}</span>
            <button onClick={increment}>+</button>
          </div>
          <button
            // onClick={() =>

            // }
            onClick={() => {
              dispatch(
                addItem({
                  id: product.id,
                  title: product.title,
                  img: product.img,
                  price: product.price,
                  category: product.category,
                  discount: product.discount,
                  count: count,
                })
              );
              handleShow();
            }}
          >
            장바구니
          </button>
        </div>
      </section>
      <section className={style.pDesc}>
        <Tabs
          defaultActiveKey="Description"
          id="fill-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Description" title="Description">
            Tab content for Description
          </Tab>
          <Tab eventKey="Additional" title="Additional information">
            Tab content for Additional information
          </Tab>
          <Tab eventKey="Reviews" title="Reviews">
            Tab content for Reviews
          </Tab>
        </Tabs>
      </section>
      <section>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {similarList.map((p) => (
            <SwiperSlide key={p.id}>
              <ListCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>장바구니 추가 완료</Modal.Title>
        </Modal.Header>
        <Modal.Body>{product?.title}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            계속 둘러보기
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate('/Cart');
            }}
          >
            장바구니로 이동
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default Product;
