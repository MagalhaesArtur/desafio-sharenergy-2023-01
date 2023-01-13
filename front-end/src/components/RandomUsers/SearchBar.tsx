import { X } from "phosphor-react";
import { useState } from "react";
import "./styles/searchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  setCurrentSearchBy: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  setCurrentSearchBy,
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
      className="flex  items-center gap-6 justify-center"
      id="searchBar"
      onSubmit={handleSubmit}
    >
      <h2 className="text-white ">Filtrar por...</h2>
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

      <div id="searchBox" className="flex gap-6 justify-center items-center">
        <input
          className="input !text-white"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <X
          onClick={() => {
            setQuery("");
          }}
          className=" cursor-pointer text-red-700"
          size={30}
        />
      </div>

      <button
        className="py-2 px-4 ml-4 bg-green-700 rounded-lg transition-all hover:bg-green-600 text-white font-semibold text-xl"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
