const { ReturnProduct, Product } = require('../models');
const { Op } = require('sequelize');

class ReturnProductRepository {
  static async findAllJoinStudent() {
    return await ReturnProduct.findAll({
      include: [{ model: Student }],
    });
  }

  static async findAllByStudentId(studentId) {
    return await ReturnProduct.findAll({
      include: [{ model: Product }],
      where: { studentId },
    });
  }

  static async findAllByStudentIdAndOverduing(studentId) {
    return await ReturnProduct.findAll({
      include: [{ model: Product }],
      where: { [Op.and]: [{ studentId }, { overdueDay: { [Op.gt]: 0 } }] },
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
