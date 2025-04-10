import React from 'react'
import './App.css'
import NavBar from './pages/NavBar';



// this is the main component of the project
function App() {
  console.log('App component loaded');
  return (
    <div className="App">
      <header className="App-header">
       <NavBar/>
      </header>
      
    </div>
  )
}
export default App
