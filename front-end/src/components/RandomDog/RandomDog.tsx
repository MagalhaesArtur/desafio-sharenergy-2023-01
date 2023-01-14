import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth, getDog } from "../../utils/randomDog";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";

export function RandomDog() {
  let navigate = useNavigate();

  const [currentUrl, setCurrentUrl]: any = useState(
    "https://random.dog/85ca20a7-e792-4166-8709-1e0710b6d68d.jpg"
  );

  const [loading, setLoading] = useState(false);

  const getAsyncDog = async () => {
    const url = await getDog();
    console.log(url);
    if (url.slice(-3).toLocaleLowerCase() !== "mp4") {
      setCurrentUrl(url);
      setLoading(false);
    } else {
      getAsyncDog();
    }
  };

  useEffect(() => {
    const getAuthr = async () => {
      const response = await getAuth();
      if (response.message != "ok") {
        navigate("/login");
        alert("Token Inválido!");
      }
    };
    getAuthr();
  }, []);

  return (
    <div className=" flex flex-col gap-6 items-center justify-start h-[100vh] w-[100vw]">
      <NavBar />
      <button
        className="py-2 px-4 ml-4 bg-green-700 rounded-lg transition-all hover:bg-green-600 text-white font-semibold text-xl"
        onClick={() => {
          setLoading(true);
          getAsyncDog();
        }}
      >
        Refresh Dog
      </button>
      {loading ? (
        <div className="w-[600px] flex justify-center items-center h-[600px]">
          <Loading size={60} />
        </div>
      ) : (
        <div className="w-[600px] flex justify-center items-center h-[600px]">
          <img
            className="max-w-[600px] max-h-[600px] rounded-xl"
            src={currentUrl}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
