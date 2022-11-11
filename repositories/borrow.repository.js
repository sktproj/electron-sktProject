const { Borrow, Product } = require('../models');

const { Op } = require('sequelize');

class BorrowRepository {
  static async findByStudentIdAndReturnDueDateGTEJoinProduct(
    studentId,
    currentDate,
  ) {
    return await Borrow.findAll({
      include: [{ model: Product }],
      where: {
        [Op.and]: [{ studentId }, { returnDueDate: { [Op.gte]: currentDate } }],
      },
    });
  }

  static async findByStudentIdAndReturnDueDateLTJoinProduct(
    studentId,
    currentDate,
  ) {
    return await Borrow.findAll({
      include: [{ model: Product }],
      where: {
        [Op.and]: [{ studentId }, { returnDueDate: { [Op.lt]: currentDate } }],
      },
    });
  }

  static async create(studentId, productId) {
    await Borrow.create({
      studentId,
      productId,
    });
  }

  static async delete(id) {
    const deletedBorrow = await Borrow.findOne({ where: { id } });
    await Borrow.destroy({
      where: {
        id: deletedBorrow.id,
      },
    });
    return deletedBorrow;
  }
}

module.exports = BorrowRepository;
