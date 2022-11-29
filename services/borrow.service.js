const BorrowRepository = require('../repositories/borrow.repository');

class BorrowService {
  static async findByStudentId(studentId) {
    return await BorrowRepository.findByStudentId(studentId);
  }

  static async findByStudentIdAndBorrowingJoinProduct(studentId) {
    return await BorrowRepository.findByStudentIdAndReturnDueDateGTEJoinProduct(
      studentId,
    );
  }

  static async findByStudentIdAndOverduingJoinProduct(studentId) {
    return await BorrowRepository.findByStudentIdAndReturnDueDateLTJoinProduct(
      studentId,
    );
  }

  static async createMany(studentId, productList) {
    return await Promise.all(
      productList.map(product => {
        return BorrowRepository.create(studentId, product);
      }),
    );
  }

  static async deleteOne(id) {
    return await BorrowRepository.delete(id);
  }

  static async deleteAllByStudentId(studentId) {
    return await BorrowRepository.deleteAllByStudentId(studentId);
  }
}

module.exports = BorrowService;
