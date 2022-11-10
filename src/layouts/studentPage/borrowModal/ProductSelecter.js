import styles from './ProductSelecter.module.css';

function productSelecter({ productList }) {
  console.log(productList);
  return (
    <div className={styles.selecters}>
      {productList.map((product, index) => {
        return (
          <button key={index} className={styles.selecter}>
            {product.name}
          </button>
        );
      })}
    </div>
  );
}

export default productSelecter;
