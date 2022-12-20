import React from "react";
import Number from './mathLogic.js';
import {groundSpeed} from './aeroNavLogic.js'
import Input from './components/Input';
import SelectInput from "./components/SelectInput";
import Content from "./components/Content";
import Container from './components/Container';
import Result from "./components/Result";
import HeaderBlue from "./components/HeaderBlue/index.jsx";
import FooterNav from "./components/FooterNav/index.jsx";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import GroundSpeed from './pages/GroundSpeed';
function App() {
 
  return (
   <>
   <Routes>
    
    <Route path='/groundspeed' exact element={<GroundSpeed/>}/>
   </Routes>
   
    
    <FooterNav/>
   </>
  );
}

export default App;
