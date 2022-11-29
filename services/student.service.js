const StudentRepository = require('../repositories/student.repository');

class StudentService {
  static async findById(id) {
    return await StudentRepository.findById(id);
  }

  static async findAllIdd() {
    return await StudentRepository.findAllIdd();
  }

  static async findByGradeAndClassNMAndStudentNB(studentData) {
    const student = await StudentRepository.findByGradeAndClassNMAndStudentNB(
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

  static async update(id, updatedStudentData) {
    return await StudentRepository.update(id, updatedStudentData);
  }
}

module.exports = StudentService;
