import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomeOverview from './modules/home/HomeOverview';
import StudentDashboardModule from './modules/student-dashboard/StudentDashboardModule';
import CourseBuilderModule from './modules/course-builder/CourseBuilderModule';
import QuizzesAssessmentsModule from './modules/quizzes-assessments/QuizzesAssessmentsModule';
import ContentToolsReportsModule from './modules/content-tools-reports/ContentToolsReportsModule';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeOverview />} />
          <Route path="student-dashboard" element={<StudentDashboardModule />} />
          <Route path="course-builder" element={<CourseBuilderModule />} />
          <Route path="quizzes-assessments" element={<QuizzesAssessmentsModule />} />
          <Route path="content-tools-reports" element={<ContentToolsReportsModule />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
