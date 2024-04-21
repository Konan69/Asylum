import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom"

// import 

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Whitelist from './pages/Whitelist'

const Dashboard = () =>{
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:'/',
    element: <Dashboard/>,
    children:[{  
      path:'/',
      element:<Home/>
    },
    {
      path: "/whitelist",
      element: <Whitelist/>
    },
    // {
    //   path: "/whitelist/r/:id", // Define the dynamic parameter ":id"
    //   element: <Whitelist/> // Render the Whitelist component
    // }
  ]
  },
  {
    path:'/',
    element: <Home/>
  }, {
    path: "/*",
    element: <NotFound />
  }

])


function App() {
  return (
    <>
      <div className ="App">
        <RouterProvider router ={router} />
      </div>

    </>
  )
}

export default App
