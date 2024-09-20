import "../src/index.css";
import { Route,  Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage";
// import Aboutus from "./Pages/Aboutus";
// import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element = {<HomePage/>} ></Route>
          {/* <Route path="/about" element = {<Aboutus/>} ></Route>
          <Route path="/*" element = {<NotFound/>} ></Route> */}
          <Route path="/signup" element = {<Signup/>} ></Route>
          
      </Routes>
      
    </>
  )
}

export default App
