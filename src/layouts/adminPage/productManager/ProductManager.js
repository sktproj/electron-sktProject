import { useState, useEffect } from 'react';
import ProductWidget from './productWidget/ProductWidget';
import AddProductButton from './addProductButton/AddProductButton';
import ProductAPI from 'api/ProductAPI.js';
import styles from './ProductManager.module.css';

function ProductManager() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      setProductList(await ProductAPI.findAllProduct());
    })();
  }, []);

  return (
    <div className={styles.productManager}>
      <div className={styles.title}>물품 관리 창</div>
      <div className={styles.widgetList}>
        <div className={styles.widgetGrid}>
          {productList.map((product, index) => {
            return (
              <ProductWidget key={index} id={product.id} name={product.name} />
            );
          })}
          <AddProductButton />
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
