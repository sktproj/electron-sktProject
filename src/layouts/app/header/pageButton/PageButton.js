import styles from './PageButton.module.css';

function PageButton({ isHidden, onClickEvent, image }) {
  return (
    <button
      className={styles.pageButton}
      style={{ visibility: `${isHidden ? 'hidden' : 'visible'}` }}
      onClick={onClickEvent}
    >
      <img src={image} width="25px" alt="" />
    </button>
  );
}

export default PageButton;
