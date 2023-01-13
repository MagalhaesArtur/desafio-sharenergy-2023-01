import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDog } from "../../utils/randomDog";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

export function RandomDog() {
  let navigate = useNavigate();

  const [currentUrl, setCurrentUrl]: any = useState("");

  const [loading, setLoading] = useState(false);

  const [redirectLoadingClient, setRedirectLoadingClient] = useState(false);
  const [redirectLoadingHTTP, setRedirectLoadingHTTP] = useState(false);
  const [redirectLoadingUsers, setRedirectLoadingUsers] = useState(false);

  const getAsyncDog = async () => {
    const url = await getDog();
    console.log(url);
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
  useEffect(() => {
    getAsyncDog();
  }, []);
  return (
    <div className=" flex flex-col gap-6 items-center justify-center h-[100vh] w-[100vw]">
      <div className="absolute top-4 flex items-center gap-3 right-4">
        <Button
          onClick={() => {
            setRedirectLoadingClient(true);
            setTimeout(() => {
              setRedirectLoadingClient(false);
              navigate("/clients");
            }, 500);
          }}
        >
          {redirectLoadingClient ? <Loading size={32} /> : <h1>Clients</h1>}
        </Button>
        <Button
          onClick={() => {
            setRedirectLoadingHTTP(true);
            setTimeout(() => {
              setRedirectLoadingHTTP(false);
              navigate("/httpcats");
            }, 500);
          }}
        >
          {redirectLoadingHTTP ? <Loading size={32} /> : <h1>HTTP Cats</h1>}
        </Button>

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
      </div>
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
