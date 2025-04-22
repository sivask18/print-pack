import React from 'react'
import './App.css'
import Home from './pages/Home';

// this is the main component of the project
function App() {
  console.log('App component loaded');
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
      </header>
      
    </div>
  )
}
export default App
