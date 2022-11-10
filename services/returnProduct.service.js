const ReturnProductRepository = require('../repositories/returnProduct.repository');

const DateUtil = require('../utils/Date');

class ReturnProductService {
  static async findAllByStudentId(studentId) {
    const returnProductList = await ReturnProductRepository.findAllByStudentId(
      studentId,
    );

    const processedReturnProductList = returnProductList.map(returnProduct => {
      console.log(returnProduct.Product.name);
      const name = returnProduct.Product.name;
      const { borrowDate, returnDate, overdueDay } = returnProduct;

      return [name, borrowDate, returnDate, `${overdueDay}일`];
    });

    return processedReturnProductList;
  }

  static async createOne(returnedProduct) {
    const { studentId, productId, borrowDate, returnDueDate } = returnedProduct;
    const remainingReturnDay = DateUtil.getRemainingDays(
      DateUtil.getCurrentDate(),
      returnDueDate,
    );
    const overdueDay = remainingReturnDay >= 0 ? 0 : -remainingReturnDay;

    const returnedProductData = {
      studentId,
      productId,
      borrowDate,
      overdueDay,
    };

    await ReturnProductRepository.create(returnedProductData);
  }
}

module.exports = ReturnProductService;
