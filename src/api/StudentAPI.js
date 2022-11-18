const { ipcRenderer } = window.require('electron');

class StudentAPI {
  static findByGradeAndClassNMAndName(studentData) {
    return new Promise(resolve => {
      ipcRenderer.send(
        'GetStudentByGradeAndClassNMAndName',
        JSON.stringify(studentData),
      );
      ipcRenderer.on(
        'Reply_GetStudentByGradeAndClassNMAndName',
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
