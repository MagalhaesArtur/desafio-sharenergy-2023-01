import { useEffect, useState } from "react";
import { GetRandomUsers } from "../../utils/randomUsersApi";
import { Pagination } from "./Pagination";
import { Users } from "./Users";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Loading } from "../Loading";
import { NoUsersFound } from "./NoUsersFound";
import { Button } from "@mui/material";

interface RandomUserProps {
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
}

export function RandomUsers(props?: any) {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [redirectLoadingClient, setRedirectLoadingClient] = useState(false);
  const [redirectLoadingHTTP, setRedirectLoadingHTTP] = useState(false);
  const [redirectLoadingDog, setRedirectLoadingDog] = useState(false);

  const [isSearchedUsersVoid, setIsSearchedUsersVoid] = useState(false);

  const [randomUsers, setRandomUsers] = useState(Array<RandomUserProps>);
  let [currentUsers, setCurrentUsers] = useState(Array<RandomUserProps>);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentSearchBy, setCurrentSearchBy] = useState("name");

  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      const users = await GetRandomUsers();
      if (users.message == "token inválido") {
        navigate("/login");
        alert("Token Inválido!");
      } else {
        setRandomUsers(users);
        let indexOfLastUser = currentPage * postsPerPage;
        let indexOfFirstUser = indexOfLastUser - postsPerPage;

        let aux: Array<RandomUserProps> = users.slice(
          indexOfFirstUser,
          indexOfLastUser
        );

        setCurrentUsers(aux);
      }

      setLoading(false);
    };

    getUsers();
  }, []);

  useEffect(() => {
    let indexOfLastUser = currentPage * postsPerPage;
    let indexOfFirstUser = indexOfLastUser - postsPerPage;

    let aux: Array<RandomUserProps> = randomUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

    setCurrentUsers(aux);
  }, [currentPage]);

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const onSearch = (query: string) => {
    setIsSearchedUsersVoid(false);
    if (query == "") {
      let indexOfLastUser = currentPage * postsPerPage;
      let indexOfFirstUser = indexOfLastUser - postsPerPage;
      let aux = randomUsers.slice(indexOfFirstUser, indexOfLastUser);

      setCurrentUsers(aux);
    } else {
      if (currentSearchBy == "name") {
        const currentSearchedUsers: Array<RandomUserProps> = [];
        for (let user of randomUsers) {
          if (
            query.toLocaleLowerCase() == user.name.first.toLocaleLowerCase() ||
            query.toLocaleLowerCase() == user.name.last.toLocaleLowerCase()
          ) {
            currentSearchedUsers.push(user);
          }
        }
        if (currentSearchedUsers.length == 0) {
          setIsSearchedUsersVoid(true);
        }
        setCurrentUsers(currentSearchedUsers);
      } else if (currentSearchBy == "email") {
        const currentSearchedUsers: Array<RandomUserProps> = [];
        for (let user of randomUsers) {
          if (query.toLocaleLowerCase() == user.email.toLocaleLowerCase()) {
            currentSearchedUsers.push(user);
          }
        }
        if (currentSearchedUsers.length == 0) {
          setIsSearchedUsersVoid(true);
        }
        setCurrentUsers(currentSearchedUsers);
      } else if (currentSearchBy == "username") {
        const currentSearchedUsers: Array<RandomUserProps> = [];
        for (let user of randomUsers) {
          if (
            query.toLocaleLowerCase() == user.login.username.toLocaleLowerCase()
          ) {
            currentSearchedUsers.push(user);
          }
        }

        if (currentSearchedUsers.length == 0) {
          setIsSearchedUsersVoid(true);
        }
        setCurrentUsers(currentSearchedUsers);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-no-repeat bg-center min-h-[100vh] w-[100vw]">
      <div
        id="navigateButtons"
        className="absolute top-4 flex items-center gap-3 right-4"
      >
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

      <div
        id="container"
        className="flex flex-col gap-5 justify-center items-center"
      >
        <SearchBar
          setCurrentSearchBy={setCurrentSearchBy}
          onSearch={onSearch}
        />

        {isSearchedUsersVoid ? (
          <NoUsersFound />
        ) : (
          <Users loading={loading} randomUsers={currentUsers} />
        )}
      </div>

      <Pagination
        setIsSearchedUsersVoid={setIsSearchedUsersVoid}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={30}
        paginate={paginate}
      />
    </div>
  );
}
