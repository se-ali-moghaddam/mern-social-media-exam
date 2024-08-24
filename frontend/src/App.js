import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;