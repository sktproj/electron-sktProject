const StudentRepository = require('../repositories/student.repository');

class StudentService {
  static async findById(id) {
    return await StudentRepository.findById(id);
  }

  static async findAllId() {
    return await StudentRepository.findAllId();
  }

  static async findAllGraduate() {
    return await StudentRepository.findAllWhereGradeGTEThree();
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

  static async deleteOne(id) {
    return await StudentRepository.deleteOne(id);
  }
}

module.exports = StudentService;
