import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login/Login";
import Clients from "./components/Users/Clients";
import { RandomUsers } from "./components/RandomUsers/RandomUsers";
import { HTTPCodes } from "./components/HTTPCat/HTTPCodes";
import { RandomDog } from "./components/RandomDog/RandomDog";
import { SwitchTheme } from "./components/SwitchTheme";
import { Register } from "./components/Register/Resgister";

function App() {
  let darkMode = false;
  const theme = localStorage.getItem("theme");
  if (theme && theme == "dark") {
    darkMode = true;
  }
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  return (
    <div id={`${isDarkMode ? "dark" : "vanilla"}`} className={`min-h-full `}>
      <SwitchTheme setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />

      <Router>
        <Routes>
          <Route
            path="/register"
            element={<Register isDarkMode={isDarkMode} />}
          />

          <Route path="/" element={<Login isDarkMode={isDarkMode} />} />
          <Route
            path="/clients"
            element={<Clients isDarkMode={isDarkMode} />}
          />
          <Route
            path="/randomUsers"
            element={<RandomUsers isDarkMode={isDarkMode} />}
          />
          <Route
            path="/httpcats"
            element={<HTTPCodes isDarkMode={isDarkMode} />}
          />
          <Route path="/randomDog" element={<RandomDog />} />

          <Route path="/*" element={<Clients isDarkMode={isDarkMode} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
