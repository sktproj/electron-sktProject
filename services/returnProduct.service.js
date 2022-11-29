const ReturnProductRepository = require('../repositories/returnProduct.repository');
const moment = require('moment');

class ReturnProductService {
  static async findAllJoinStudentAndProduct() {
    return await ReturnProductRepository.findAllJoinStudentAndProduct();
  }

  static async findAllByStudentId(studentId) {
    const returnProductList = await ReturnProductRepository.findAllByStudentId(
      studentId,
    );

    const processedReturnProductList = returnProductList.map(returnProduct => {
      const name = returnProduct.Product.name;
      const { borrowDate, returnDate, overdueDay } = returnProduct;

      return [name, borrowDate, returnDate, `${overdueDay}일`];
    });

    return processedReturnProductList;
  }

  static async findAllByStudentIdAndOverduing(studentId) {
    const returnProductList =
      await ReturnProductRepository.findAllByStudentIdAndOverduing(studentId);

    const processedReturnProductList = returnProductList.map(returnProduct => {
      const name = returnProduct.Product.name;
      const { borrowDate, returnDate, overdueDay } = returnProduct;

      return [name, borrowDate, returnDate, `${overdueDay}일`];
    });

    return processedReturnProductList;
  }

  static async createOne(returnedProduct) {
    const { studentId, productId, borrowDate, returnDueDate } = returnedProduct;
    const diffDate = moment(returnDueDate).diff(
      moment(moment(), 'YYYY-MM-DD'),
      'days',
    );
    const overdueDay = diffDate >= 0 ? 0 : -diffDate;

    const returnedProductData = {
      studentId,
      productId,
      borrowDate,
      overdueDay,
    };

    return await ReturnProductRepository.create(returnedProductData);
  }

  static async deleteAllByStudentId(studentId) {
    return await ReturnProductRepository.deleteAllByStudentId(studentId);
  }
}

module.exports = ReturnProductService;
