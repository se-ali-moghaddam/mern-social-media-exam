import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register/Register";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/auth/login/Login";
import HomeScreen from "./pages/home/HomeScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>

      <ToastContainer/>
    </>
  );
}

export default App;