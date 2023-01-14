import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login/Login";
import Clients from "./components/Users/Clients";
import { RandomUsers } from "./components/RandomUsers/RandomUsers";
import { HTTPCodes } from "./components/HTTPCat/HTTPCodes";
import { RandomDog } from "./components/RandomDog/RandomDog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/randomUsers" element={<RandomUsers />} />
        <Route path="/httpcats" element={<HTTPCodes />} />
        <Route path="/randomDog" element={<RandomDog />} />

        <Route path="/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
