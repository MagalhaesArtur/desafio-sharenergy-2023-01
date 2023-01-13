import axios from "axios";
import { useEffect, useState } from "react";
import { getAuth, statusMessages } from "../../utils/httpCodes";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import "./styles/cat.css";

export function HTTPCodes() {
  let navigate = useNavigate();

  const [baseURL, setBaseURL] = useState("https://http.cat");
  const [currentCode, setCurrentCode] = useState("200");
  const [loading, setLoading] = useState(false);

  const [redirectLoadingUsers, setRedirectLoadingUsers] = useState(false);
  const [redirectLoadingDog, setRedirectLoadingDog] = useState(false);

  const [redirectLoadingHTTP, setRedirectLoadingHTTP] = useState(false);

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
    <div className="items-center  justify-center flex h-[100vh] w-[100vw]">
      <div className="absolute top-4 flex items-center gap-3 right-4">
        <Button
          onClick={() => {
            setRedirectLoadingUsers(true);
            setTimeout(() => {
              setRedirectLoadingUsers(false);
              navigate("/randomUsers");
            }, 500);
          }}
        >
          {redirectLoadingUsers ? <Loading size={32} /> : <h1>Random Users</h1>}
        </Button>
        <Button
          onClick={() => {
            setRedirectLoadingHTTP(true);
            setTimeout(() => {
              setRedirectLoadingHTTP(false);
              navigate("/clients");
            }, 500);
          }}
        >
          {redirectLoadingHTTP ? <Loading size={32} /> : <h1>Clients</h1>}
        </Button>

        <Button
          onClick={() => {
            setRedirectLoadingDog(true);
            setTimeout(() => {
              setRedirectLoadingDog(false);
              navigate("/randomDog");
            }, 500);
          }}
        >
          {redirectLoadingDog ? <Loading size={32} /> : <h1>Random Dogs</h1>}
        </Button>
      </div>
      <form className="h-[700px] gap-6 flex flex-col">
        <div id="formSection" className="flex gap-4 items-center">
          <h1
            defaultValue={"200"}
            className="text-white text-2xl font-semibold"
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
