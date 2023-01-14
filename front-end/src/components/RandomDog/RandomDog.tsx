import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDog } from "../../utils/randomDog";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";

export function RandomDog() {
  const [currentUrl, setCurrentUrl]: any = useState("");
  const [Refresh, setRefresh] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAsyncDog = async () => {
      const url = await getDog();
      if (
        url.slice(-3).toLocaleLowerCase() == "jpg" ||
        url.slice(-3).toLocaleLowerCase() == "gif" ||
        url.slice(-4).toLocaleLowerCase() == "jpeg" ||
        url.slice(-3).toLocaleLowerCase() == "png"
      ) {
        setCurrentUrl(url);
        setLoading(false);
      } else {
        getAsyncDog();
      }
    };

    getAsyncDog();
  }, [Refresh]);
  return (
    <div className=" flex flex-col gap-6 items-center justify-start h-[100vh] w-[100vw]">
      <NavBar />
      <button
        className="py-2 px-4 ml-4 bg-green-700 rounded-lg transition-all hover:bg-green-600 text-white font-semibold text-xl"
        onClick={() => {
          setLoading(true);
          setRefresh(!Refresh);
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
