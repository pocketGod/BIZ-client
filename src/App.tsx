import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/starter-components/Login';
import Register from './components/starter-components/Register';
import { ToastContainer } from 'react-toastify';
import Home from './components/general-components/Home';
import Cards from './components/card-components/Cards';
import MyBiz from './components/card-components/MyBiz';
import NewCard from './components/card-components/NewCard';
import EditCard from './components/card-components/EditCard';
import About from './components/general-components/About';
import Profile from './components/general-components/Profile';


function App() {

  return (
    <div className="App">
      <ToastContainer
        toastStyle={{ backgroundColor: "#AECEFA", color:'white' }}
        // theme='light'
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/cards' element={<Cards/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/my-biz' element={<MyBiz/>}/>
          <Route path='/new-biz' element={<NewCard/>}/>
          <Route path='/edit-biz/:id' element={<EditCard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
