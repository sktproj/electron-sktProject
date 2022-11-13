import { useState, useEffect, useContext } from 'react';
import AppContext from 'context/AppContext';
import ProductWidget from './productWidget/ProductWidget';
import AddProductButton from './addProductButton/AddProductButton';
import ProductAPI from 'api/ProductAPI.js';
import styles from './ProductManager.module.css';
import KIND_OF_MODAL from 'constant/KIND_OF_MODAL';

function ProductManager() {
  const [productList, setProductList] = useState([]);
  const { currentModal, update } = useContext(AppContext);

  useEffect(() => {
    if (currentModal === KIND_OF_MODAL.NONE) {
      (async () => {
        setProductList(await ProductAPI.findAllProduct());
      })();
    }
  }, [currentModal, update]);

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
