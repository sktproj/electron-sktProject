const BorrowRepository = require('../repositories/borrow.repository');

const DateUtil = require('../utils/Date');

class BorrowService {
  static async findByStudentIdAndBorrowingJoinProduct(studentId) {
    return await BorrowRepository.findByStudentIdAndReturnDueDateGTEJoinProduct(
      studentId,
      DateUtil.getCurrentDate(),
    );
  }

  static async findByStudentIdAndOverduingJoinProduct(studentId) {
    return await BorrowRepository.findByStudentIdAndReturnDueDateLTJoinProduct(
      studentId,
      DateUtil.getCurrentDate(),
    );
  }

  static async createMany(studentId, productList) {
    await Promise.all(
      productList.map(product => {
        return BorrowRepository.create(studentId, product);
      }),
    );
  }

  static async deleteOne(id) {
    return await BorrowRepository.delete(id);
  }
}

module.exports = BorrowService;
