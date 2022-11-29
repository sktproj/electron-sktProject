const { Student } = require('../models');
const { Op } = require('sequelize');

class StudentRepository {
  static async findById(id) {
    return await Student.findOne({ where: { id } });
  }

  static async findAllId() {
    return await Student.findAll({ attributes: ['id'] });
  }

  static async findAllWhereGradeGTEThree() {
    return await Student.findAll({ where: { grade: { [Op.gte]: 3 } } });
  }

  static async findByGradeAndClassNMAndStudentNB(studentData) {
    const student = await Student.findOne({ where: { ...studentData } });
    return student;
  }

  static async create(createdStudentData) {
    return await Student.create({ ...createdStudentData });
  }

  static async update(id, updatedStudentData) {
    return await Student.update(
      { ...updatedStudentData },
      { where: { id } },
    ).catch(err => {
      console.log(err);
    });
  }

  static async deleteOne(id) {
    return await Student.destroy({ where: { id } });
  }
}

module.exports = StudentRepository;
