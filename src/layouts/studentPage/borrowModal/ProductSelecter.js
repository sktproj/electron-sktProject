import { useState, useEffect } from 'react';
import styles from './ProductSelecter.module.css';

const { ipcRenderer } = window.require('electron');

function ProductSelecter({ selectedList, setSelectedList }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    ipcRenderer.send('FindAllProduct');
    ipcRenderer.on('Reply_FindAllProduct', (event, payload) => {
      const parsedPayload = JSON.parse(payload);
      setProductList(parsedPayload);
    });
  }, []);

  return (
    <div className={styles.selecters}>
      {productList.map((product, index) => {
        const { id, name } = product;
        const isSelectProduct = selectedList.indexOf(id) !== -1 ? true : false;
        return (
          <button
            key={index}
            className={`${styles.selecter} ${
              isSelectProduct ? styles.selected : null
            }`}
            onClick={() => {
              isSelectProduct
                ? setSelectedList(prev =>
                    prev.filter(selected => selected !== id),
                  )
                : setSelectedList(prev => [...prev, id]);
            }}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default ProductSelecter;
