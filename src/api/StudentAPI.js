const { ipcRenderer } = window.require('electron');

class StudentAPI {
  static findById(studentId) {
    return new Promise(resolve => {
      ipcRenderer.send('GetStudentById', JSON.stringify(studentId));
      ipcRenderer.on('Reply_GetStudentById', (event, payload) => {
        resolve(JSON.parse(payload));
      });
    });
  }

  static findByGradeAndClassNMAndStudentNBAndName(studentData) {
    return new Promise(resolve => {
      ipcRenderer.send(
        'GetStudentByGradeAndClassNMAndStudentNBAndName',
        JSON.stringify(studentData),
      );
      ipcRenderer.on(
        'Reply_GetStudentByGradeAndClassNMAndStudentNBAndName',
        (event, payload) => {
          resolve(JSON.parse(payload));
        },
      );
    });
  }

  static createStudent(studentData) {
    return new Promise(resolve => {
      ipcRenderer.send('CreateStudent', JSON.stringify(studentData));
      ipcRenderer.on('Reply_CreateStudent', (event, payload) => {
        resolve();
      });
    });
  }

  static updateStudent(id, studentData) {
    return new Promise(resolve => {
      ipcRenderer.send(
        'UpdateStudent',
        JSON.stringify({ studentId: id, studentData }),
      );
      ipcRenderer.on('Reply_UpdateStudent', (event, payload) => {
        resolve();
      });
    });
  }
}

export default StudentAPI;
