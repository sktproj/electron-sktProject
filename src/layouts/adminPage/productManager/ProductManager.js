import { useState, useEffect } from 'react';
import ProductWidget from './productWidget/ProductWidget';
import AddProductButton from './addProductButton/AddProductButton';
import ProductAPI from 'api/ProductAPI.js';
import styles from './ProductManager.module.css';

function ProductManager() {
  const [reloadEvent, reload] = useState();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      setProductList(await ProductAPI.findAllProduct());
    })();
  }, [reloadEvent]);

  return (
    <div className={styles.productManager}>
      <div className={styles.title}>물품 관리 창</div>
      <div className={styles.widgetList}>
        {productList.map((product, index) => {
          return (
            <ProductWidget
              key={index}
              id={product.id}
              name={product.name}
              reload={reload}
            />
          );
        })}
        <AddProductButton />
      </div>
    </div>
  );
}

export default ProductManager;
