const { ipcRenderer } = window.require('electron');

class ElectronStoreAPI {
  static set(key, value) {
    return new Promise(resolve => {
      ipcRenderer.send('SetElectronStore', JSON.stringify({ key, value }));
      ipcRenderer.on('Reply_SetElectronStore', (event, payload) => {
        resolve();
      });
    });
  }

  static get(key) {
    return new Promise(resolve => {
      ipcRenderer.send('GetElectronStore', JSON.stringify(key));
      ipcRenderer.on('Reply_GetElectronStore', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }
}

export default ElectronStoreAPI;
