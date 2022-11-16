const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const remote = require('@electron/remote/main');
remote.initialize();

const { ipcMain } = require('electron');

require('dotenv').config({ path: path.join(__dirname, '../config/.env') });
require('../models').sequelize.sync();

const { SerialPort } = require('serialport');
const serialport = new SerialPort({ path: 'COM4', baudRate: 9600 });

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  serialport.on('open', () => {
    serialport.on('data', async data => {
      const cardId = data.toString('utf8').replace('\r', '');
      const StudentService = require('../services/student.service');
      const studentData = await StudentService.findById(cardId);

      win.webContents.send(
        'ScanningCard',
        JSON.stringify({ cardId, studentData }),
      );
    });
  });

  remote.enable(win.webContents);
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// create student
ipcMain.on('CreateStudent', async (event, payload) => {
  const StudentService = require('../services/student.service');
  const createdStudentData = JSON.parse(payload);
  await StudentService.create(createdStudentData);
  event.reply('Reply_CreateStudent');
});

// find all product
ipcMain.on('FindAllProduct', async event => {
  const ProductService = require('../services/product.service');
  const allProductist = await ProductService.findAll();
  event.reply('Reply_FindAllProduct', JSON.stringify(allProductist));
});

// add product
ipcMain.on('AddProduct', async (event, payload) => {
  const ProductService = require('../services/product.service');
  const productName = JSON.parse(payload);
  await ProductService.create(productName);
  event.reply('Reply_AddProduct');
});

// change product status to delete
ipcMain.on('UpdateProduct', async (event, payload) => {
  const ProductService = require('../services/product.service');
  const { productId, updatedData } = JSON.parse(payload);
  await ProductService.update(productId, updatedData);
  event.reply('Reply_UpdateProduct');
});

// get borrow list
ipcMain.on('GetBorrowListAll', async (event, payload) => {
  const BorrowService = require('../services/borrow.service');
  const borrowList = await BorrowService.findByStudentId(JSON.parse(payload));
  event.reply('Reply_GetBorrowListAll', JSON.stringify(borrowList));
});

ipcMain.on('GetBorrowListFilterBorrow', async (event, payload) => {
  const BorrowService = require('../services/borrow.service');
  const borrowList = await BorrowService.findByStudentIdAndBorrowingJoinProduct(
    JSON.parse(payload),
  );
  event.reply('Reply_GetBorrowListFilterBorrow', JSON.stringify(borrowList));
});

ipcMain.on('GetBorrowListFilterOverdue', async (event, payload) => {
  const BorrowService = require('../services/borrow.service');
  const borrowList = await BorrowService.findByStudentIdAndOverduingJoinProduct(
    JSON.parse(payload),
  );
  event.reply('Reply_GetBorrowListFilterOverdue', JSON.stringify(borrowList));
});

// add borrow list
ipcMain.on('AddBorrowList', async (event, payload) => {
  const BorrowService = require('../services/borrow.service');
  const { studentId, productList } = JSON.parse(payload);
  await BorrowService.createMany(studentId, productList);
  event.reply('Reply_AddBorrowList');
});

//delete borrow list
ipcMain.on('ReturnProduct', async (event, payload) => {
  const BorrowService = require('../services/borrow.service');
  const ReturnProductService = require('../services/returnProduct.service');
  const borrowId = JSON.parse(payload);
  const returnedProduct = await BorrowService.deleteOne(borrowId);
  await ReturnProductService.createOne(returnedProduct);
  event.reply('Reply_ReturnProduct');
});

// get return product list
ipcMain.on('GetReturnProductList', async (event, payload) => {
  const ReturnProductService = require('../services/returnProduct.service');
  const studentId = JSON.parse(payload);
  const returnProductList = await ReturnProductService.findAllByStudentId(
    studentId,
  );
  event.reply('Reply_GetReturnProductList', JSON.stringify(returnProductList));
});

// get return product list filter overdue
ipcMain.on('GetReturnProductListFilterOverdue', async (event, payload) => {
  const ReturnProductService = require('../services/returnProduct.service');
  const studentId = JSON.parse(payload);
  const returnProductList =
    await ReturnProductService.findAllByStudentIdAndOverduing(studentId);
  event.reply(
    'Reply_GetReturnProductListFilterOverdue',
    JSON.stringify(returnProductList),
  );
});

// electron basic setting
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
