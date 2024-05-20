import ListCard from './ListCard';

const MainList = ({ products }) => {
  return (
    <section className="mainList">
      <h2>Shop The Latest</h2>
      <a href="/shopall">View All</a>
      <ul className="listCon">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ListCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MainList;
