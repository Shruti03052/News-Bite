
import './App.css';
import Login from './screens/login';
import React from 'react';
import Signup from './screens/Signup'
import Navbar from './components/navbar';
import Home from './screens/home';
import Cards from './components/cards' ;
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

function App() {
  return(
    <AuthProvider>

     <Router>
      <Navbar></Navbar>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/category/:category" element={<Cards/>} />
        </Routes>
    </div>

    </Router>

  </AuthProvider>
    
    


  );
 
}

export default App;
