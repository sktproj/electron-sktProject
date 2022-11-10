import styles from './TableFilter.module.css';
import FILTER_LIST from 'constant/FILTER';

function TableFilter({ currentFilter, setCurrentFilter }) {
  const filterListArr = Object.values(FILTER_LIST);

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
