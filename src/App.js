import StudentPage from 'pages/StudentPage';

function App() {
  const studentData = {
    id: 123456,
    grade: 3,
    classNM: 5,
    name: '신재훈',
    overdue: 999,
  };

  return (
    <>
      <StudentPage student={studentData} />
    </>
  );
}

export default App;
