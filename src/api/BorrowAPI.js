const { ipcRenderer } = window.require('electron');

class BorrowAPI {
  static getBorrowListAll(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetBorrowListAll', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetBorrowListAll', (event, payload) => {
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

  static addBorrow(studentId, selectedList) {
    return new Promise(resolve => {
      ipcRenderer.send(
        'AddBorrowList',
        JSON.stringify({
          studentId,
          productList: selectedList,
        }),
      );
      ipcRenderer.on('Reply_AddBorrowList', (event, payload) => {
        resolve();
      });
    });
  }
}

export default BorrowAPI;
