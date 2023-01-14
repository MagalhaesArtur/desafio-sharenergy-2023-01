import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, statusMessages } from "../../utils/httpCodes";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import "./styles/cat.css";
import { NavBar } from "../NavBar";

export function HTTPCodes(props: { isDarkMode: boolean }) {
  let navigate = useNavigate();

  const [baseURL, setBaseURL] = useState("https://http.cat");
  const [currentCode, setCurrentCode] = useState("200");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUrl = async () => {
      const response = await getAuth();
      if (response.message != "ok") {
        navigate("/login");
        alert("Token Inválido!");
      }
      setBaseURL("https://http.cat" + "/" + currentCode);
    };

    getUrl();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <div className="items-center  flex-col justify-start flex h-[100vh] w-[100vw]">
      <NavBar />
      <form className="h-[700px] gap-6 flex flex-col">
        <div id="formSection" className="flex gap-4 items-center">
          <h1
            defaultValue={"200"}
            className={`transition-all ${
              props.isDarkMode ? "text-white" : "text-slate-800"
            }  text-2xl font-semibold`}
          >
            Selecione um Código HTTP:
          </h1>
          <select
            onChange={(e) => {
              setLoading(true);

              setCurrentCode(e.target.value);
            }}
            name="httpCode"
            className="p-3 rounded-lg flex bg-[#dcdde1] outline-none"
          >
            {statusMessages.map((code) => (
              <option value={code.value.slice(0, 3)}>
                {code.value.slice(0, 3)}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="w-[600px] h-[400px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <img
            className="rounded-lg w-[600px] h-[500px]"
            src={baseURL}
            alt=""
          />
        )}
      </form>
    </div>
  );
}
