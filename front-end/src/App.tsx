import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./main.css";

import Login from "./components/Login/Login";
import Clients from "./components/Users/Clients";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </Router>
  );
}

export default App;
