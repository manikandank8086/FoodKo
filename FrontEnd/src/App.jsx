import React from "react";

import "./index.css";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
        <Route element={<Layout />}> 
          <Route path="/" element={<Dashboard />} />
         
        </Route>
                </Routes>
      </div>
    </Router>
  );
}

export default App;
