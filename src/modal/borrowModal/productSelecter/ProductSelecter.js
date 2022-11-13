import { useState, useEffect } from 'react';
import ProductAPI from 'api/ProductAPI';
import ProductSelectButton from './productSelectButton/ProductSelectButton';
import styles from './ProductSelecter.module.css';

function ProductSelecter({ selectedList, setSelectedList }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      setProductList(await ProductAPI.findAllProduct());
    })();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.selecters}>
        {productList.map((product, index) => {
          const { id, name } = product;
          const isSelectProduct =
            selectedList.indexOf(id) !== -1 ? true : false;
          return (
            <ProductSelectButton
              key={index}
              selected={isSelectProduct}
              onClickEvent={() => {
                isSelectProduct
                  ? setSelectedList(prev =>
                      prev.filter(selected => selected !== id),
                    )
                  : setSelectedList(prev => [...prev, id]);
              }}
            >
              {name}
            </ProductSelectButton>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSelecter;
