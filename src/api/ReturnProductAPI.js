const { ipcRenderer } = window.require('electron');

class ReturnProductAPI {
  static async getReturnProductList(studentId) {
    return new Promise(resolve => {
      const stringifiedStudentId = JSON.stringify(studentId);
      ipcRenderer.send('GetReturnProductList', stringifiedStudentId);
      ipcRenderer.on('Reply_GetReturnProductList', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }

  static async getReturnProductListFilterOverdue(studentId) {
    return new Promise(resolve => {
      const stringifiedStudentId = JSON.stringify(studentId);
      ipcRenderer.send(
        'GetReturnProductListFilterOverdue',
        stringifiedStudentId,
      );
      ipcRenderer.on(
        'Reply_GetReturnProductListFilterOverdue',
        (event, payload) => {
          resolve(JSON.parse(payload));
        },
      );
    });
  }

  static returnProduct(borrowId) {
    return new Promise(resolve => {
      ipcRenderer.send('ReturnProduct', JSON.stringify(borrowId));
      ipcRenderer.on('Reply_ReturnProduct', (event, payload) => {
        resolve();
      });
    });
  }
}

export default ReturnProductAPI;
