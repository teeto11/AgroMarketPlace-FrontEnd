import React from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Market from './pages/Market'

function App() {
  return (
    <div className="App">
       <ToastContainer autoClose={3000} />
      <Market />
      
    </div>
  );
}

export default App;
