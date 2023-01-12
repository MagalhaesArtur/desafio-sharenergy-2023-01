import { useEffect, useState } from "react";
import { GetRandomUsers } from "../../utils/randomUsersApi";
import { Pagination } from "./Pagination";
import { Users } from "./Users";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Loading } from "../Loading";
import { NoUsersFound } from "./NoUsersFound";

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

  const [isSearchedUsersVoid, setIsSearchedUsersVoid] = useState(false);

  const [randomUsers, setRandomUsers] = useState(Array<RandomUserProps>);
  let [currentUsers, setCurrentUsers] = useState(Array<RandomUserProps>);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentSearchBy, setCurrentSearchBy] = useState("email");

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

  console.log(isSearchedUsersVoid);

  const onSearch = (query: string) => {
    setIsSearchedUsersVoid(false);
    console.log(currentSearchBy);
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
    <div className="flex flex-col gap-5 justify-center items-center bg-no-repeat bg-center h-[100vh] w-[100vw]">
      <SearchBar setCurrentSearchBy={setCurrentSearchBy} onSearch={onSearch} />

      {isSearchedUsersVoid ? (
        <NoUsersFound />
      ) : (
        <Users loading={loading} randomUsers={currentUsers} />
      )}

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
