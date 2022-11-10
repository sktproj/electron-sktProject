const { Student } = require('../models');

class StudentRepository {
  static async findAll(id) {
    const student = await Student.findBy({ where: { id } });
    return student;
  }
}

module.exports = StudentRepository;
