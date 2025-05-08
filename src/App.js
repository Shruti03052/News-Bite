
import './App.css';
import Login from './screens/login';
import React from 'react';
import Signup from './screens/Signup'
import Navbar from './components/navbar';
import Home from './screens/home';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
function App() {
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
        </Routes>
    </div>

    </Router>
    


  );
 
}

export default App;
