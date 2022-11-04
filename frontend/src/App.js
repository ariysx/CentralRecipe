import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Main from "./pages/main";
import Header from "./components/header";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Recipes from "./pages/dashboard/recipes";
import NewRecipe from "./pages/dashboard/newRecipe";
import Favourites from "./pages/dashboard/favourites";

function App() {
  return (
      <>
          <Router>
              <div>
                  <Header />
                  <Routes>
                      <Route path='/' element={<Main/>}/>
                      <Route path='/dashboard' element={<Dashboard/>}/>
                      <Route path='/dashboard/recipes' element={<Recipes/>}/>
                      <Route path='/dashboard/recipes/new' element={<NewRecipe/>}/>
                      <Route path='/dashboard/favourites' element={<Favourites/>}/>
                      <Route path='/dashboard/profile' element={<NewRecipe/>}/>
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
