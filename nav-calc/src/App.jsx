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
import Home from './pages/Home';
import DevelopPage from './pages/DevelopPage';
import NewFlightPlanPage from './pages/NewFlightPlanPage';
import MyRoutes from './pages/MyRoutes';
import MapPage from './pages/MapPage';
function App() {
 
  return (
   <>
   <Routes>
    <Route path='/' exact element={<Home/>}/>
    <Route path='/groundspeed' exact element={<GroundSpeed/>}/>
    
    <Route path='/createFlightPlan' exact element={<NewFlightPlanPage/>}/>
    <Route path='/my-routes' exact element={<MyRoutes/>}/>
    <Route path='/messages' exact element={<DevelopPage/>}/>
    <Route path='/settings' exact element={<DevelopPage/>}/>
    <Route path='/profile' exact element={<DevelopPage/>}/>
    <Route path='/map' exact element={<MapPage/>}/>
    
   </Routes>
   
    <FooterNav/>
   </>
  );
}

export default App;
