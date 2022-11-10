const { ReturnProduct, Product } = require('../models');

class ReturnProductRepository {
  static async findAllByStudentId(studentId) {
    return await ReturnProduct.findAll({
      include: [{ model: Product }],
      where: { studentId },
    });
  }

  static async create(returnedProductData) {
    const { studentId, productId, borrowDate, overdueDay } =
      returnedProductData;

    await ReturnProduct.create({
      studentId,
      productId,
      borrowDate,
      overdueDay,
    });
  }
}

module.exports = ReturnProductRepository;
