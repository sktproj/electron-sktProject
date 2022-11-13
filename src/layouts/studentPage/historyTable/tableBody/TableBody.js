import styles from './TableBody.module.css';

function TableBody({ column, row }) {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          {column.map((column, index) => {
            return (
              <th key={index} className={styles.th}>
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {row.map((row, index) => {
          return (
            <tr key={index} className={styles.tr}>
              {row.map((rowData, index) => {
                return (
                  <td key={index} className={styles.td}>
                    {rowData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableBody;
