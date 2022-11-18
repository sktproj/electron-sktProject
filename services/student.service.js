const StudentRepository = require('../repositories/student.repository');

class StudentService {
  static async findByGradeAndClassNMAndName(studentData) {
    const student = await StudentRepository.findByGradeAndClassNMAndName(
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
