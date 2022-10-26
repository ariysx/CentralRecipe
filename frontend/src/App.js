import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Main from "./pages/main";
import Header from "./components/header";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyRecipes from "./pages/dashboard/myRecipes";
import NewRecipe from "./pages/dashboard/newRecipe";

function App() {
  return (
      <>
          <Router>
              <div>
                  <Header />
                  <Routes>
                      <Route path='/' element={<Main/>}/>
                      <Route path='/dashboard' element={<Dashboard/>}/>
                      <Route path='/dashboard/recipes' element={<MyRecipes/>}/>
                      <Route path='/dashboard/recipes/new' element={<NewRecipe/>}/>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/register' element={<Register/>}/>
                  </Routes>
              </div>
          </Router>
          <ToastContainer />
      </>
  );
}

export default App;
