import { CircleNotch } from "phosphor-react";

export function Pagination(props: {
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  paginate: Function;
  setIsSearchedUsersVoid: Function;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="w-[60%]">
      <ul className="w-[100%] flex justify-center">
        {pageNumbers.map((page) => (
          <li
            className={`${
              props.currentPage == page ? "bg-blue-700 text-white" : "bg-white"
            } first:!border-r-[1px] last:!border-l-[1px]  cursor-pointer flex justify-center items-center  w-12 h-10 border-x-[1px] border-gray-400`}
            key={page}
            onClick={() => {
              props.setIsSearchedUsersVoid(false);
              props.paginate(page);
            }}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
}
