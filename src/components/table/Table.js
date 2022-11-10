import styles from './Table.module.css';
import styled from 'styled-components';

function TableBody(props) {
  const Th = styled.th`
    font-size: calc(${props.fontSize} + 4px);
  `;

  const Td = styled.td`
    font-size: ${props.fontSize};
  `;

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          {props.columnList.map((column, index) => {
            return (
              <Th key={index} className={styles.th}>
                {column}
              </Th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {props.rowList.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((rowData, index) => {
                return (
                  <Td key={index} className={styles.td}>
                    {rowData}
                  </Td>
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
