import { useEffect, useState } from 'react';
import styles from './Pagenation.module.css';

function Pagenation({ showedPageAmount, limitPage, setter }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setter(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.pagenation}>
      <button
        className={styles.item}
        onClick={() => {
          currentPage - showedPageAmount < 1
            ? setCurrentPage(1)
            : setCurrentPage(prev =>
                getPrevStartPageNumber(currentPage, showedPageAmount),
              );
        }}
      >
        &lt;
      </button>
      {createPageNav(showedPageAmount, currentPage, setCurrentPage, limitPage)}
      <button
        className={styles.item}
        onClick={() => {
          currentPage + showedPageAmount > limitPage
            ? setCurrentPage(limitPage)
            : setCurrentPage(prev =>
                getNextStartPageNumber(currentPage, showedPageAmount),
              );
        }}
      >
        &gt;
      </button>
    </div>
  );
}

function createPageNav(
  showedPageAmount,
  currentPage,
  setCurrentPage,
  limitPage,
) {
  let navList = [];
  const startPageNumber = getCurrentStartPageNumber(
    currentPage,
    showedPageAmount,
  );
  for (let i = 0; i < showedPageAmount; i++) {
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

function getCurrentStartPageNumber(currentPage, showedPageAmount) {
  return 1 + (Math.ceil(currentPage / showedPageAmount) - 1) * showedPageAmount;
}

function getPrevStartPageNumber(currentPage, showedPageAmount) {
  return (
    1 +
    (Math.ceil((currentPage - showedPageAmount) / showedPageAmount) - 1) *
      showedPageAmount
  );
}

function getNextStartPageNumber(currentPage, showedPageAmount) {
  return (
    1 +
    (Math.ceil((currentPage + showedPageAmount) / showedPageAmount) - 1) *
      showedPageAmount
  );
}

export default Pagenation;
