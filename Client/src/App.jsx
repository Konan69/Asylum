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
import Footer from './components/Footer'

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
  },
])


function App() {

  if (window.location.pathname === '/') {
    import('mdb-react-ui-kit/dist/css/mdb.min.css').catch((err) => console.error('Failed to import MDB UI kit CSS:', err))
  }

  return (
    <>
      <div className ="App">
        <RouterProvider router ={router} />
      </div>

    </>
  )
}

export default App
