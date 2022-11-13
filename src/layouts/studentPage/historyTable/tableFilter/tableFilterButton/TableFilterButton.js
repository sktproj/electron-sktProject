import styles from './TableFilterButton.module.css';

function TableFilterButton({ children, isSelected, onClickEvent }) {
  return (
    <button
      className={`${styles.filterButton} ${
        isSelected ? styles.selected : null
      }`}
      onClick={onClickEvent}
    >
      {children}
    </button>
  );
}

export default TableFilterButton;
