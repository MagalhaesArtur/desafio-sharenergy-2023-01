import { useEffect, useState } from "react";
import { GetRandomUsers } from "../../utils/randomUsersApi";
import { Pagination } from "./Pagination";
import { Users } from "./Users";

export function RandomUsers(props?: any) {
  const [loading, setLoading] = useState(false);

  const [randomUsers, setRandomUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      const users = await GetRandomUsers();
      setRandomUsers(users);

      setLoading(false);
    };

    getUsers();
  }, []);

  const paginate = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  let indexOfLastUser = currentPage * postsPerPage;
  let indexOfFirstUser = indexOfLastUser - postsPerPage;
  let currentUsers = randomUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-no-repeat bg-center h-[100vh] w-[100vw]">
      <Users loading={loading} randomUsers={currentUsers} />
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={30}
        paginate={paginate}
      />
    </div>
  );
}
