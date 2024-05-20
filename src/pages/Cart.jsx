import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeAge, changeName } from '../store/userStore';
import { addCount, minCount, deleteItem } from '../store/cartStore';
const Cart = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  // const stock = useSelector((state) => state.stock);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="mw">
      <h2>
        {user.age}세 {user.username}님의 장바구니{' '}
        <button onClick={() => dispatch(changeName('길동이'))}>이름변경</button>
      </h2>
      <p>3개의 아이템이 담겨있어요</p>
      <p>
        나이 {user.age}{' '}
        <button onClick={() => dispatch(changeAge(10))}>나이변경</button>
      </p>
      <Table striped bordered hover className="cart">
        <colgroup>
          <col width={'50px'} />
          <col width={'*'} />
          <col width={'150px'} />
          <col width={'100px'} />
          <col width={'100px'} />
          <col width={'100px'} />
          <col width={'50px'} />
        </colgroup>
        <thead>
          <tr>
            <th>id</th>
            <th>상품명 / 이미지 / 옵션 내용</th>
            <th>상품가격</th>
            <th>할인률</th>
            <th>상품수량</th>
            <th>결제금액</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.id}>
                <td className="center">{item.id}</td>
                <td onClick={() => navigate(`/products/${item.id}`)}>
                  <div className="imgTD">
                    <img src={`/img/${item.img}`} alt={item.title} />
                    {item.title}
                  </div>
                </td>
                <td className="right">
                  ${parseInt(item.price, 10).toLocaleString()}
                </td>
                <td className="center">{item.discount}%</td>
                <td className="center">
                  {item.count === 1 ? (
                    <button
                      onClick={() => {
                        dispatch(minCount(item.id));
                      }}
                      disabled
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(minCount(item.id));
                      }}
                    >
                      -
                    </button>
                  )}
                  <span>{item.count}</span>
                  <button
                    onClick={() => {
                      dispatch(addCount(item.id));
                    }}
                  >
                    +
                  </button>
                </td>
                <td className="right">
                  {(
                    parseInt(item.count, 10) *
                    parseInt(item.price, 10) *
                    (1 - parseInt(item.discount, 10) / 100)
                  ).toLocaleString()}
                  원
                </td>
                <td
                  className="center"
                  onClick={() => dispatch(deleteItem(item.id))}
                >
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td colSpan={7} className="right">
              최종 결제 금액{' '}
              {cart
                .reduce(
                  (acc, cur) =>
                    acc +
                    parseInt(cur.price, 10) *
                      (1 - parseInt(cur.discount, 10) / 100) *
                      parseInt(cur.count, 10),
                  0
                )
                .toLocaleString()}
              원
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default Cart;
