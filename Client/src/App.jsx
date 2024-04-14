import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Link,
} from "react-router-dom"

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
    }
  ]
  },
  {
    path:'/',
    element: <Home/>
  },
  {
    path:"/whitelist",
    element:<Whitelist/>,
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
