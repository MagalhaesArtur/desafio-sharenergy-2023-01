import { useEffect, useState } from "react";
import { GetRandomUsers } from "../../utils/randomUsersApi";
import { Users } from "./Users";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { NoUsersFound } from "./NoUsersFound";
import { NavBar } from "../NavBar";

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

export function RandomUsers(props: { isDarkMode: boolean }) {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isSearchedUsersVoid, setIsSearchedUsersVoid] = useState(false);
  const [randomUsers, setRandomUsers] = useState(Array<RandomUserProps>);
  let [currentUsers, setCurrentUsers] = useState(Array<RandomUserProps>);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchBy, setCurrentSearchBy] = useState("name");
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      const users = await GetRandomUsers();
      if (users.message == "token inválido") {
        navigate("/");
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
  }, [currentPage, postsPerPage]);

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
            user.name.first
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            user.name.last
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
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
          if (
            user.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          ) {
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
            user.login.username
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
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
    <div className="flex flex-col gap-5 justify-start items-center bg-no-repeat bg-center min-h-[100vh] w-[100vw]">
      <NavBar />

      <div
        id="container"
        className="flex flex-col gap-5 justify-center items-center"
      >
        <SearchBar
          isDarkMode={props.isDarkMode}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
          paginate={paginate}
          setIsSearchedUsersVoid={setIsSearchedUsersVoid}
          setCurrentSearchBy={setCurrentSearchBy}
          onSearch={onSearch}
        />

        {isSearchedUsersVoid ? (
          <NoUsersFound />
        ) : (
          <Users loading={loading} randomUsers={currentUsers} />
        )}
      </div>
    </div>
  );
}
