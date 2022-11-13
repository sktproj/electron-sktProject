import styles from './Pagenation.module.css';
import TABLE_SHOWED_ROW_AMOUNT from 'constant/TABLE_SHOWED_ROW_AMOUNT';

function Pagenation({ limitPage, currentPage, setCurrentPage }) {
  return (
    <div className={styles.pagenation}>
      <button
        className={styles.item}
        onClick={() => {
          currentPage - TABLE_SHOWED_ROW_AMOUNT < 1
            ? setCurrentPage(1)
            : setCurrentPage(prev =>
                getPrevStartPageNumber(currentPage, TABLE_SHOWED_ROW_AMOUNT),
              );
        }}
      >
        &lt;
      </button>
      {createPageNav(
        TABLE_SHOWED_ROW_AMOUNT,
        currentPage,
        setCurrentPage,
        limitPage,
      )}
      <button
        className={styles.item}
        onClick={() => {
          currentPage + TABLE_SHOWED_ROW_AMOUNT > limitPage
            ? setCurrentPage(limitPage)
            : setCurrentPage(prev =>
                getNextStartPageNumber(currentPage, TABLE_SHOWED_ROW_AMOUNT),
              );
        }}
      >
        &gt;
      </button>
    </div>
  );
}

function createPageNav(
  TABLE_SHOWED_ROW_AMOUNT,
  currentPage,
  setCurrentPage,
  limitPage,
) {
  let navList = [];
  const startPageNumber = getCurrentStartPageNumber(
    currentPage,
    TABLE_SHOWED_ROW_AMOUNT,
  );
  for (let i = 0; i < TABLE_SHOWED_ROW_AMOUNT; i++) {
    const pageNumber = startPageNumber + i;
    if (pageNumber > limitPage) {
      break;
    }
    const nav = (
      <button
        key={i}
        className={`${styles.item} ${
          pageNumber === currentPage ? styles.selected : null
        }`}
        onClick={() => {
          setCurrentPage(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
    navList.push(nav);
  }
  return navList;
}

function getCurrentStartPageNumber(currentPage, TABLE_SHOWED_ROW_AMOUNT) {
  return (
    1 +
    (Math.ceil(currentPage / TABLE_SHOWED_ROW_AMOUNT) - 1) *
      TABLE_SHOWED_ROW_AMOUNT
  );
}

function getPrevStartPageNumber(currentPage, TABLE_SHOWED_ROW_AMOUNT) {
  return (
    1 +
    (Math.ceil(
      (currentPage - TABLE_SHOWED_ROW_AMOUNT) / TABLE_SHOWED_ROW_AMOUNT,
    ) -
      1) *
      TABLE_SHOWED_ROW_AMOUNT
  );
}

function getNextStartPageNumber(currentPage, TABLE_SHOWED_ROW_AMOUNT) {
  return (
    1 +
    (Math.ceil(
      (currentPage + TABLE_SHOWED_ROW_AMOUNT) / TABLE_SHOWED_ROW_AMOUNT,
    ) -
      1) *
      TABLE_SHOWED_ROW_AMOUNT
  );
}

export default Pagenation;
