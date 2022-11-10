const BorrowRepository = require('../repositories/borrow.repository');

const DateUtil = require('../utils/Date');

class BorrowService {
  static async findByStudentIdJoinProduct(studentId) {
    return await BorrowRepository.joinProductBystudentId(studentId);
  }

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

  static #processBorrowList(borrowList) {
    return borrowList.map(borrow => {
      const productName = borrow.Product.name;
      const { id, borrowDate, returnDueDate } = borrow;
      let remainingDays = DateUtil.getRemainingDays(
        DateUtil.getCurrentDate(),
        returnDueDate,
      );
      const remainingReturnDay =
        remainingDays >= 0
          ? remainingDays === 0
            ? '오늘까지'
            : `${remainingDays}일`
          : '0일';
      const status = remainingDays >= 0 ? '빌림' : '연체';
      const overdueDay = remainingDays >= 0 ? '0일' : `${-remainingDays}일`;

      return {
        id,
        productName,
        borrowDate,
        returnDueDate,
        remainingReturnDay,
        status,
        overdueDay,
      };
    });
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
