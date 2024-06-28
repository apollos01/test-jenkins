import React from 'react'
import ReactDOM from 'react-dom/client'


import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";

import { MainPage } from './pages/MainPage.jsx';
import { AboutPage } from './pages/about.jsx';
import { JobListing } from './pages/joblisting.jsx';
import { Register } from './pages/register.jsx';
import { Login } from './pages/login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


const router = createBrowserRouter( [
  { path: "/",
    element: <MainPage/>,

    

  },

  {
  path:"about",
  element: <AboutPage/>
  },

  {
    path :"joblisting",
    element:<JobListing/>
    
  },
  {
    path : "register",
    element:<Register/>
  },

  {
    path : "login",
    element: <Login/>
  }


])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <AuthProvider>
    <RouterProvider router={router}/>
       </AuthProvider>
  </React.StrictMode>,
)