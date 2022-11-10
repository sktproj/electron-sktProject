import Button from 'components/button/Button';

const { ipcRenderer } = window.require('electron');

class TableBodyAPI {
  static getBorrowListFilterAll(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListFilterAll', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListFilterAll', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }

  static getBorrowListFilterBorrow(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListFilterBorrow', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListFilterBorrow', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }

  static getBorrowListFilterOverdue(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListFilterOverdue', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListFilterOverdue', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }

  static #getReturnButton(borrowId) {
    return (
      <Button
        width="70px"
        height="40px"
        fontSize="22px"
        color="#e74a3b"
        onClickEvent={() => {
          console.log(borrowId);
        }}
      >
        반납
      </Button>
    );
  }
}

export default TableBodyAPI;
