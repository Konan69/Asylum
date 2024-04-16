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

import Whitelist from './pages/Whitelist'
import Home from './pages/Home'
import Navbar from './components/Navbar'

const Dashboard = () =>{
  return (
    <div>
      <Navbar/>
      <Outlet/>
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
  },
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
