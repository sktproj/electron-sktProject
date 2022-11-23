const StudentRepository = require('../repositories/student.repository');

class StudentService {
  static async findById(id) {
    return await StudentRepository.findById(id);
  }

  static async findByGradeAndClassNMAndStudentNBAndName(studentData) {
    const student =
      await StudentRepository.findByGradeAndClassNMAndStudentNBAndName(
        studentData,
      );

    if (!student) {
      return null;
    }

    return student;
  }

  static async create(createdStudentData) {
    return await StudentRepository.create(createdStudentData);
  }
}

module.exports = StudentService;
