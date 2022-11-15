const { Student } = require('../models');

class StudentRepository {
  static async findById(id) {
    const student = await Student.findOne({ where: { id } });
    return student;
  }

  static async create(createdStudentData) {
    await Student.create({ ...createdStudentData });
  }
}

module.exports = StudentRepository;
