const { ipcRenderer } = window.require('electron');

class FileSystemAPI {
  static writeExcelFile(returnProductList) {
    return new Promise(resolve => {
      ipcRenderer.send('WriteExcelFile');
      ipcRenderer.on('Reply_WriteExcelFile', (event, payload) => {
        resolve();
      });
    });
  }
}

export default FileSystemAPI;
