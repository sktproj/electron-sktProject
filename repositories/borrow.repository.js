const { Borrow, Product } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

class BorrowRepository {
  static async findByStudentId(studentId) {
    return await Borrow.findAll({
      include: [{ model: Product }],
      where: {
        studentId,
      },
    });
  }

  static async findByStudentIdAndReturnDueDateGTEJoinProduct(studentId) {
    return await Borrow.findAll({
      include: [{ model: Product }],
      where: {
        [Op.and]: [
          { studentId },
          {
            returnDueDate: { [Op.gte]: moment(moment(), 'YYYY-MM-DD') },
          },
        ],
      },
    });
  }

  static async findByStudentIdAndReturnDueDateLTJoinProduct(studentId) {
    return await Borrow.findAll({
      include: [{ model: Product }],
      where: {
        [Op.and]: [
          { studentId },
          {
            returnDueDate: { [Op.lt]: moment(moment(), 'YYYY-MM-DD') },
          },
        ],
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
