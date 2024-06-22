import Homepage from "./pages/Homepage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChooseUser from "./pages/ChooseUser";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/Admin/AdminRegister";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choose" element={<ChooseUser />} />
        <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
        <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
        <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />
        <Route path="/AdminRegister" element={<AdminRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
