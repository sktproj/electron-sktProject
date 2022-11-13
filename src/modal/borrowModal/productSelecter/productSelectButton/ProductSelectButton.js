import styles from './ProductSelectButton.module.css';

function ProductSelectButton({ children, selected, onClickEvent }) {
  return (
    <button
      style={{ fontSize: `${34 - children.length * 2}px` }}
      className={`${styles.selectButton} ${selected ? styles.selected : null}`}
      onClick={onClickEvent}
    >
      {children}
    </button>
  );
}

export default ProductSelectButton;
