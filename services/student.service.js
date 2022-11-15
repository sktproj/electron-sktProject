const StudentRepository = require('../repositories/student.repository');

class StudentService {
  static async findById(id) {
    const student = await StudentRepository.findById(id);

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
