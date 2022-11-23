const { Student } = require('../models');

class StudentRepository {
  static async findById(id) {
    return await Student.findOne({ where: { id } });
  }

  static async findByGradeAndClassNMAndStudentNBAndName(studentData) {
    const student = await Student.findOne({ where: { ...studentData } });
    return student;
  }

  static async create(createdStudentData) {
    await Student.create({ ...createdStudentData });
  }
}

module.exports = StudentRepository;
