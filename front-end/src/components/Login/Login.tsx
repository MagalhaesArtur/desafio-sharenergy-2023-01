import { FormEvent, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { blue, pink } from "@mui/material/colors";
import { LoginApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [isLoginError, setIsLoginError] = useState(false);
  const [MessageError, setMessageError] = useState("");

  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // Faz o login aqui
    const res = await LoginApi(username, password);
    if (typeof res == "string") {
      setLoading(false);
      setIsLoginError(true);
      setMessageError(res);
      setTimeout(() => {
        setIsLoginError(false);
      }, 4000);
    } else {
      localStorage.setItem("token", res.token);
      setLoading(false);
      navigate("/clients");
    }
  }

  console.log(rememberMe);

  return (
    <div className="flex justify-center items-center bg-no-repeat bg-center h-[100vh] w-[100vw]">
      <div id="form" className="flex flex-col justify-around items-center">
        <h1 className="text-slate-300 font-bold text-3xl">WELCOME</h1>
        <form
          className="flex items-center text-slate-200 flex-col"
          onSubmit={handleSubmit}
        >
          <label>
            <input
              required
              className={`input ${
                isLoginError ? "!border-red-500 !border-[1px]" : null
              }`}
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            <input
              required
              className={`input ${
                isLoginError ? "!border-red-600 !border-[1px]" : null
              }`}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          {isLoginError ? (
            <h1 className="text-lg text-red-700 font-bold">{MessageError}</h1>
          ) : null}

          <div className="flex items-center mt-5 w-[250px] justify-start">
            <Checkbox
              defaultChecked
              sx={{
                color: blue[800],
                "&.Mui-checked": {
                  color: blue[600],
                },
              }}
              id="check"
              className="mr-4"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="check" className="font-semibold text-lg">
              Remember me
            </label>
          </div>
          <br />
          <button
            onClick={() => {
              setLoading(true);
            }}
            id="submitButton"
            type="submit"
          >
            {loading ? <Loading size={30} /> : "Sing Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
