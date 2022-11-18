const { Student } = require('../models');

class StudentRepository {
  static async findByGradeAndClassNMAndName(studentData) {
    const student = await Student.findOne({ where: { ...studentData } });
    return student;
  }

  static async create(createdStudentData) {
    await Student.create({ ...createdStudentData });
  }
}

module.exports = StudentRepository;
