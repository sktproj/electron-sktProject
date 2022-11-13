import TableFilterButton from './tableFilterButton/TableFilterButton';
import styles from './TableFilter.module.css';
import KIND_OF_TABLE_FILTER from 'constant/KIND_OF_TABLE_FILTER';

function TableFilter({ currentFilter, setCurrentFilter }) {
  const filterList = Object.values(KIND_OF_TABLE_FILTER);

  return (
    <div className={styles.tableFilter}>
      {filterList.map((filter, index) => {
        return (
          <TableFilterButton
            key={index}
            isSelected={currentFilter === filter}
            onClickEvent={() => {
              setCurrentFilter(filter);
            }}
          >
            {filter}
          </TableFilterButton>
        );
      })}
    </div>
  );
}

export default TableFilter;
