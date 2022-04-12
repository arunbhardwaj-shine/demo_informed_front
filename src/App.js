import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./Pages/Webinar/Dashboard";
 import Home from "./Dashboard/Home";
import Add from "./Pages/Webinar/Event/Add";
import Dashboard from "./Pages/Webinar/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Webinar/dashboard" element={<Dashboard />} />
        <Route path="/Webinar/Event/Add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
