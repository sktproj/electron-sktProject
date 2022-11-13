import styles from './ProductNameInput.module.css';

function ProductNameInput({ setProductName }) {
  return (
    <input
      placeholder="물품의 이름을 입력하세요"
      className={styles.input}
      onChange={e => {
        setProductName(e.target.value);
      }}
    ></input>
  );
}

export default ProductNameInput;
