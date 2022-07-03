import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Profilepage from "./Profilepage";
import Loginpage from "./Loginpage";
import Registerpage from "./Registerpage";
import Uploadpage from "./Uploadpage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/upload" element={<Uploadpage />} />
      </Routes>
    </>
  );
}

export default App;
