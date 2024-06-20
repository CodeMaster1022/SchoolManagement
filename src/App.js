import Homepage from "./pages/Homepage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
