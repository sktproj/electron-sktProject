import Header from 'components/header/Header';
import StudentPage from 'pages/StudentPage';
import styles from './App.module.css';

function App() {
  const studentData = {
    id: 123456,
    grade: 3,
    classNM: 5,
    name: '신재훈',
    overdue: 999,
  };

  return (
    <div className={styles.root}>
      <Header />
      <StudentPage student={studentData} />
    </div>
  );
}

export default App;
