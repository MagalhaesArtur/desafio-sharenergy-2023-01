import { Box, Button, TablePagination, TextField } from "@mui/material";
import { X } from "phosphor-react";
import { useState } from "react";
import "./styles/searchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  setCurrentSearchBy: Function;
  currentPage: number;
  postsPerPage: number;
  paginate: Function;
  setPostsPerPage: Function;
  setIsSearchedUsersVoid: Function;
  isDarkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isDarkMode,
  setCurrentSearchBy,
  currentPage,
  setPostsPerPage,
  postsPerPage,
  paginate,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form
      className="flex flex-col  items-center gap-6 justify-center"
      id="searchBar"
      onSubmit={handleSubmit}
    >
      <div
        id={`${isDarkMode ? "searchBox" : null}`}
        className={`w-full gap-6 flex justify-center items-center  `}
      >
        <h2 className={`${isDarkMode ? "text-white" : "text-slate-800"} `}>
          Filtrar por...
        </h2>
        <select
          onChange={(e) => {
            setCurrentSearchBy(e.target.value);
          }}
          className="p-3 rounded-lg flex bg-[#dcdde1] outline-none"
          name="searchBy"
          id=""
        >
          <option value="" disabled>
            Selecione um filtro de pesquisa...
          </option>
          <option defaultChecked value="name">
            Nome
          </option>
          <option value="email">Email</option>
          <option value="username">Username</option>
        </select>

        <div
          id={`${isDarkMode ? "searchContainer" : null}`}
          className="flex gap-6 transition-all justify-center items-center"
        >
          <TextField
            label="Search"
            type={"text"}
            value={query}
            onChange={handleChange}
            sx={{
              width: "100%",
              "& label.Mui-focused": {
                color: `#00A2A2`,
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: ` #00A2A2`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `#00A2A2`,
                },
              },
            }}
          />
          <X
            onClick={() => {
              setQuery("");
            }}
            className=" cursor-pointer text-red-700"
            size={30}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          className="!bg-[#00A2A2] hover:!bg-[#195959] transition-all"
          sx={{
            textTransform: "none",
            fontWeight: "400",
            fontSize: 18,
            "&:hover": {
              color: "white",
              backgroundColor: "#175F5F",
              cursor: "pointer",
            },
          }}
        >
          Search
        </Button>
      </div>

      <div className="w-full transition-all gap-6 flex justify-center items-center ">
        <TablePagination
          page={currentPage - 1}
          onPageChange={(
            event: React.MouseEvent<HTMLButtonElement> | null,
            page: number
          ) => {
            paginate(page + 1);
          }}
          rowsPerPage={postsPerPage}
          onRowsPerPageChange={(e) => {
            console.log(e.target.value);

            setPostsPerPage(e.target.value);
          }}
          count={500}
          labelRowsPerPage="Quantidade: "
          sx={{
            color: `${isDarkMode ? "white" : null}`,
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
