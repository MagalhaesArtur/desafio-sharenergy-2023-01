import { FormEvent, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { blue, pink } from "@mui/material/colors";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    // Faz o login aqui
    console.log(`Logging in ${username}`);
    console.log(`Remember me: ${rememberMe}`);
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
              className="input"
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
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="flex items-center w-[250px] justify-start">
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
          <button id="submitButton" type="submit">
            Sing Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
