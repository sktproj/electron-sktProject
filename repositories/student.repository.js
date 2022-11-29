const { Student } = require('../models');

class StudentRepository {
  static async findById(id) {
    return await Student.findOne({ where: { id } });
  }

  static async findAllIdd() {
    return await Student.findAll({ attributes: ['id'] });
  }

  static async findByGradeAndClassNMAndStudentNB(studentData) {
    const student = await Student.findOne({ where: { ...studentData } });
    return student;
  }

  static async create(createdStudentData) {
    await Student.create({ ...createdStudentData });
  }

  static async update(id, updatedStudentData) {
    await Student.update({ ...updatedStudentData }, { where: { id } });
  }
}

module.exports = StudentRepository;
