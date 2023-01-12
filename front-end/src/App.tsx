import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./main.css";

import Login from "./components/Login/Login";
import Clients from "./components/Users/Clients";
import { RandomUsers } from "./components/RandomUsers/RandomUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/randomUsers" element={<RandomUsers />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
