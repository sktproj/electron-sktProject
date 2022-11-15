const { ipcRenderer } = window.require('electron');

class StudentAPI {
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
