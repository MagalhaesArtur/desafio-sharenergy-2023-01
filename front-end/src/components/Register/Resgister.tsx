import { Button, Checkbox, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Globe } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../utils/api";
import { RegisterUser } from "../../utils/register";
import { Loading } from "../Loading";
import "./styles.css";

export function Register(props: { isDarkMode: boolean }) {
  let navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [MessageError, setMessageError] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const res = await RegisterUser(login, password);
    if (res == "Login já existe!") {
      setLoading(false);
      setIsLoginError(true);
      setMessageError(res);
      setTimeout(() => {
        setIsLoginError(false);
      }, 4000);
    } else {
      const res = await LoginApi(login, password, rememberMe);
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
        navigate("/randomUsers");
      }
    }
  }

  return (
    <div className="flex justify-center items-center bg-no-repeat bg-center h-[100vh] w-[100vw]">
      <div
        id="image"
        className="w-[60%] bg-center h-[100vh]  flex flex-col justify-center items-center  bg-solarPainel2"
      >
        <h1 id="title" className="text-5xl text-white font-bold ">
          Bem vindo.
        </h1>
        <div
          id={`${props.isDarkMode ? "textContainer2" : "textContainer"}`}
          className={`px-4 flex-col items-center  flex justify-between transition-all py-9 text-2xl mt-[200px] font-normal ${
            props.isDarkMode ? " text-white" : "text-[#2a2a2a]"
          }  `}
        >
          <h2 className="mb-4">
            Economize com a Energia Solar! Tenha ao seu lado uma equipe de
            especialistas em energia solar. Economia, segurança e retorno do seu
            investimento garantidos.
          </h2>
          <div>
            Saiba mais em:{" "}
            <a href="https://www.sharenergy.com.br/" target="_blank">
              {" "}
              <Button
                className="mt-4 !bg-[#00A2A2] hover:!bg-[#077373] transition-all flex items-center gap-2"
                variant="contained"
              >
                <Globe size={32} color="white" />
                Sharenergy
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div
        id="formContainer"
        className=" !w-[40%] flex flex-col justify-around items-center"
      >
        <img
          src="https://www.sharenergy.com.br/wp-content/uploads/2022/12/logo_color.png"
          className="w-[60%] mb-10"
          alt=""
        />
        <form
          id={`${props.isDarkMode ? "textBox" : null}`}
          className="flex items-center w-full text-slate-200 flex-col"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Login"
            className="!text-red-700"
            type={"text"}
            inputProps={{ maxLength: 30 }}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            sx={{
              width: "70%",
              "& label.Mui-focused": {
                color: `${isLoginError ? "#DC2626 " : "#00A2A2"}`,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: `${isLoginError ? "#DC2626 " : "#00A2A2"}`,
                },
                "&:hover fieldset": {
                  borderColor: `#077373`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${isLoginError ? "#DC2626 " : "#00A2A2"}`,
                },
              },
            }}
            required
          />

          <br />

          <TextField
            className="username !text-red-400"
            label="Password"
            type="password"
            variant="outlined"
            inputProps={{ maxLength: 30 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "70%",
              "& label.Mui-focused": {
                color: `${isLoginError ? "#DC2626 " : "#00A2A2"}`,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: `${isLoginError ? "#DC2626 " : "#00A2A2"}`,
                },
                "&:hover fieldset": {
                  borderColor: `#077373`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${isLoginError ? "#DC2626 " : "#00A2A2"}`,
                },
              },
            }}
            required
          />

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
            <label
              htmlFor="check"
              className="text-slate-800 font-semibold text-lg"
            >
              Lembre de Mim
            </label>
          </div>
          <br />
          <button
            onClick={() => {
              setLoading(true);
              if (password == "" || login == "") {
                setLoading(false);
              }
            }}
            id="submitButton"
            type="submit"
          >
            {loading ? <Loading size={30} /> : "Criar Conta"}
          </button>
          <footer className="mt-4">
            <h2
              className={`${
                props.isDarkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Já tem uma conta?{" "}
              <a
                className="text-blue-600 underline cursor-pointer hover:text-blue-500 transition-all"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </a>
            </h2>
          </footer>
        </form>
      </div>
    </div>
  );
}
