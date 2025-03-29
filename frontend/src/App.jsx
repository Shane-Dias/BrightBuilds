import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProj from "./pages/CreateProj";
import ViewDetails from "./pages/ViewDetails";
import Leaderboards from "./pages/Leaderboards";

import StudentDashBoardMy from "./pages/StudentDashBoardMy";
import FacultyDashboard from "./pages/FacultyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create" element={<CreateProj/>} />
       <Route path="/student" element={<StudentDashBoardMy/>}/>
       <Route path="/faculty" element={<FacultyDashboard/>}/>
        <Route path="/details/:id" element={<ViewDetails/>} />
        <Route path="/leaderboards" element={<Leaderboards/>} />
        {/* Redirect all unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
