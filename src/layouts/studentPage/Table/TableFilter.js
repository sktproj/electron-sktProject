import styles from './TableFilter.module.css';
import TABLE from 'constant/TABLE';

function TableFilter({ currentFilter, setCurrentFilter }) {
  const filterListArr = Object.values(TABLE.FILTER_LIST);

  return (
    <div className={styles.filters}>
      {filterListArr.map((filterName, index) => {
        return (
          <button
            key={index}
            className={`${styles.filter} ${
              filterName === currentFilter ? styles.activeFilter : null
            }`}
            onClick={() => {
              setCurrentFilter(filterName);
            }}
          >
            {filterName}
          </button>
        );
      })}
    </div>
  );
}

export default TableFilter;
