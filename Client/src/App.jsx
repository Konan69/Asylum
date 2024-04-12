import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import Whitelist from './pages/Whitelist'
import Home from './pages/Home'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:"/whitelist",
    element:<Whitelist/>
  }
])


function App() {
  return (
    <>
      <div classname ="App">
        <RouterProvider router ={router} />
        hi
      </div>

    </>
  )
}

export default App
