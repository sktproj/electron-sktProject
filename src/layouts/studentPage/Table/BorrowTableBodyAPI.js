import Button from 'components/button/Button';
import DateUtil from 'utils/Date';

const { ipcRenderer } = window.require('electron');

class TableBodyAPI {
  static getBorrowListFilterAll(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListFilterAll', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListFilterAll', (event, payload) => {
        const borrowList = JSON.parse(payload);
        resolve(this.#processBorrowList(borrowList));
      });
    });
  }

  static getBorrowListFilterBorrow(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListFilterBorrow', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListFilterBorrow', (event, payload) => {
        const borrowList = JSON.parse(payload);
        resolve(this.#processBorrowList(borrowList));
      });
    });
  }

  static getBorrowListFilterOverdue(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListFilterOverdue', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListFilterOverdue', (event, payload) => {
        const borrowList = JSON.parse(payload);
        resolve(this.#processBorrowList(borrowList));
      });
    });
  }

  static #processBorrowList(borrowList) {
    return borrowList.map(borrow => {
      const productName = borrow.Product.name;
      const { id, borrowDate, returnDueDate } = borrow;
      let remainingDays = DateUtil.getRemainingDays(
        DateUtil.getCurrentDate(),
        returnDueDate,
      );
      const remainingReturnDay =
        remainingDays >= 0
          ? remainingDays === 0
            ? '오늘까지'
            : `${remainingDays}일`
          : '0일';
      const status = remainingDays >= 0 ? '빌림' : '연체';
      const overdueDay = remainingDays >= 0 ? '0일' : `${-remainingDays}일`;

      return [
        productName,
        borrowDate,
        returnDueDate,
        remainingReturnDay,
        status,
        overdueDay,
        this.#getReturnButton(id),
      ];
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
          ipcRenderer.send('ReturnProduct', JSON.stringify(borrowId));
        }}
      >
        반납
      </Button>
    );
  }
}

export default TableBodyAPI;
