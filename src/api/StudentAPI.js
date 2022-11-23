const { ipcRenderer } = window.require('electron');

class StudentAPI {
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
}

export default StudentAPI;
