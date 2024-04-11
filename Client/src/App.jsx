import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { response } from 'express'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() =>{
    fetch("/api").then(
      response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
    ).then(
      data => {
        console.log(data); // Check if data is received correctly
        setBackendData(data);
      }
    ).catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);
  return (
    <>
      <div>
      </div>
    </>
  )
}

export default App
