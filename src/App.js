import Homepage from "./pages/Homepage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChooseUser from "./pages/ChooseUser";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/choose" element={<ChooseUser />} />
      </Routes>
    </Router>
  );
}

export default App;
