import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProj from "./pages/CreateProj";
import ViewProjectDetails from "./pages/Displaydetails";
import Leaderboards from "./pages/Leaderboards";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashBoardMy from "./pages/StudentDashBoardMy";
import FacultyDashboard from "./pages/FacultyDashboard";
import ViewDetails from "./pages/ViewDetails";

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Common Routes (Accessible to Everyone) */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:id" element={<ViewDetails />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/userdetails/:id" element={<ViewProjectDetails />} />

        {/* Protected Routes */}
        <Route
          path="/faculty/:id"
          element={
            <ProtectedRoute
              element={<FacultyDashboard />}
              allowedRoles={["Faculty"]}
            />
          }
        />
        <Route
          path="/student/:id"
          element={
            <ProtectedRoute
              element={<StudentDashBoardMy />}
              allowedRoles={["Student"]}
            />
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute
              element={<CreateProj />}
              allowedRoles={["Student"]}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["Admin"]}
            />
          }
        />

        {/* Redirect all unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
