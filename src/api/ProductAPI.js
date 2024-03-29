const { ipcRenderer } = window.require('electron');

class ProductAPI {
  static findAllProduct() {
    return new Promise(resolve => {
      ipcRenderer.send('FindAllProduct');
      ipcRenderer.on('Reply_FindAllProduct', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }

  static addProduct(productName) {
    return new Promise(resolve => {
      ipcRenderer.send('AddProduct', JSON.stringify(productName));
      ipcRenderer.on('Reply_AddProduct', (event, payload) => {
        resolve();
      });
    });
  }

  static changeStatusToDeleted(productId) {
    return new Promise(resolve => {
      ipcRenderer.send(
        'UpdateProduct',
        JSON.stringify({ productId, updatedData: { deleted: true } }),
      );
      ipcRenderer.on('Reply_UpdateProduct', (event, payload) => {
        resolve();
      });
    });
  }
}

export default ProductAPI;
