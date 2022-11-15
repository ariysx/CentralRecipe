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
import Profile from "./pages/dashboard/profile"
import ViewRecipe from "./pages/viewRecipe";
import ScrollToTop from "./components/utilities/scrollToTop";
import Footer from "./components/footer";
import EditRecipe from "./pages/dashboard/editRecipe";
import Search from "./pages/search";

function App() {
  return (
      <>
          <Router>
              <div>
                  <ScrollToTop/>
                  <Header />
                  <Routes>
                      <Route path='/' element={<Main/>}/>
                      <Route path='/dashboard' element={<Dashboard/>}/>
                      <Route path='/dashboard/recipes' element={<Recipes/>}/>
                      <Route path='/dashboard/recipes/new' element={<NewRecipe/>}/>
                      <Route path='/dashboard/favourites' element={<Favourites/>}/>
                      <Route path='/dashboard/profile' element={<Profile/>}/>
                      <Route path='/dashboard/recipes/edit/:id' element={<EditRecipe/>}/>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/register' element={<Register/>}/>
                      <Route path='/recipe/:id' element={<ViewRecipe />}/>
                      <Route path='/search' element={<Search />}/>
                  </Routes>
                  <Footer/>
              </div>
          </Router>
          <ToastContainer />
      </>
  );
}

export default App;
