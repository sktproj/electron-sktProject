const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const remote = require('@electron/remote/main');
remote.initialize();

const { ipcMain } = require('electron');

require('dotenv').config({ path: path.join(__dirname, '../config/.env') });
require('../models').sequelize.sync();

const Excel = require('exceljs');
const moment = require('moment');
const ElectronStore = require('electron-store');
const electronStore = new ElectronStore();

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

  // const isUpdatedGradeInCurrentYear = electronStore.get(
  //   'isUpdatedGradeInCurrentYear',
  // );
  // if (!isUpdatedGradeInCurrentYear && moment().month + 1 >= 2) {
  //   const studentService = require('../services/student.service');
  //   const AllStudentId = studentService.findAllIdd();
  //   console.log(AllStudentId);
  // }

  (async () => {
    const studentService = require('../services/student.service');
    const AllStudentId = await studentService.findAllIdd();
    console.log(AllStudentId[0].Student.id);
  })();

  remote.enable(win.webContents);
}
app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//find student by id
ipcMain.on('GetStudentById', async (event, payload) => {
  const StudentService = require('../services/student.service');
  const studentId = JSON.parse(payload);
  const student = await StudentService.findById(studentId);
  console.log(student.updatedAt);
  event.reply('Reply_GetStudentById', JSON.stringify(student));
});

// find student by grade and classNM and studentNB and name
ipcMain.on(
  'GetStudentByGradeAndClassNMAndStudentNB',
  async (event, payload) => {
    const StudentService = require('../services/student.service');
    const studentData = JSON.parse(payload);
    const student = await StudentService.findByGradeAndClassNMAndStudentNB(
      studentData,
    );
    event.reply(
      'Reply_GetStudentByGradeAndClassNMAndStudentNB',
      JSON.stringify(student),
    );
  },
);

// create student
ipcMain.on('CreateStudent', async (event, payload) => {
  const StudentService = require('../services/student.service');
  const createdStudentData = JSON.parse(payload);
  await StudentService.create(createdStudentData);
  event.reply('Reply_CreateStudent');
});

//update student
ipcMain.on('UpdateStudent', async (event, payload) => {
  const StudentService = require('../services/student.service');
  const { studentId, studentData } = JSON.parse(payload);
  console.log('main.js student id : ', studentId);
  await StudentService.update(studentId, studentData);
  event.reply('Reply_UpdateStudent');
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
ipcMain.on('GetBorrowListAllByStudentId', async (event, payload) => {
  const BorrowService = require('../services/borrow.service');
  const borrowList = await BorrowService.findByStudentId(JSON.parse(payload));
  event.reply('Reply_GetBorrowListAllByStudentId', JSON.stringify(borrowList));
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
ipcMain.on(
  'GetReturnProductListJoinStudentAndProduct',
  async (event, payload) => {
    const ReturnProductService = require('../services/returnProduct.service');
    const returnProductList =
      await ReturnProductService.findAllJoinStudentAndProduct();
    event.reply(
      'Reply_GetReturnProductListJoinStudentAndProduct',
      JSON.stringify(returnProductList),
    );
  },
);

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

ipcMain.on('WriteExcelFile', async (event, payload) => {
  const backgroundPath = `${require('osenv').home()}\\Desktop`;
  const workbook = await createWorkbook();
  workbook.csv.writeFile(
    backgroundPath + `/${moment().format('YYYYMMDD')}_양심물품실_반납기록.csv`,
  );
  event.reply('Reply_WriteExcelFile');
});

async function createWorkbook() {
  const workbook = new Excel.Workbook();

  workbook.creator = '양심물품실';
  workbook.lastModifiedBy = '양심물품실';
  workbook.created = moment().format('YYYY-MM-DD');
  workbook.lastModifiedBy = moment().format('YYYY-MM-DD');

  const sheet1 = workbook.addWorksheet('Sheet1');

  const kindOfColumns = [
    { header: '학년', key: 'grade' },
    { header: '반', key: 'classNM' },
    { header: '번호', key: 'studentNB' },
    { header: '이름', key: 'name' },
    { header: '빌린 물품', key: 'product' },
    { header: '대여일', key: 'borrowDate' },
    { header: '반납일', key: 'returnDate' },
  ];

  sheet1.columns = kindOfColumns.map(column => {
    return {
      header: column.header,
      key: column.key,
      width: '20',
      style: {
        font: { size: 16 },
      },
    };
  });

  const ReturnProductService = require('../services/returnProduct.service');
  const returnProductList =
    await ReturnProductService.findAllJoinStudentAndProduct();

  returnProductList.forEach(returnProduct => {
    const { grade, classNM, studentNB, name } = returnProduct.Student;
    const product = returnProduct.Product.name;
    const { borrowDate, returnDate } = returnProduct;

    const sheetRow = {
      grade,
      classNM,
      studentNB,
      name,
      product,
      borrowDate,
      returnDate,
    };
    sheet1.addRow(sheetRow);
  });

  return workbook;
}

ipcMain.on('SetElectronStore', async (event, payload) => {
  const { key, value } = JSON.parse(payload);
  electronStore.set(key, value);
  event.reply('Reply_SetElectronStore');
});

ipcMain.on('GetElectronStore', async (event, payload) => {
  const key = JSON.parse(payload);
  const item = electronStore.get(key);
  event.reply('Reply_GetElectronStore', JSON.stringify(item || ''));
});

// electron basic setting
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
