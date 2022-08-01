import "./App.css";
import MyForm from "./components/MyForm";
import { Routes, Route, useLocation } from "react-router-dom";
import UserHome from "./components/UserHome";


function App() {
  const location=useLocation();
  return (
      <Routes>
        <Route path="/" element={<MyForm />} />
        <Route path="/home" element={<UserHome details={location.state}/>}/>
      </Routes>
  );
}

export default App;
