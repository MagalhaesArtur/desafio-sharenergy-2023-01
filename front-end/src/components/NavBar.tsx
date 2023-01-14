import Sandwich from "./Sandwitch";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  let navigate = useNavigate();

  return (
    <nav
      id="navBar"
      className=" flex items-center w-[100vw] px-5 mt-8 justify-between"
    >
      <div>
        <a
          href="#
        "
          onClick={() => {
            navigate("/randomUsers");
          }}
        >
          <img
            src="https://www.sharenergy.com.br/wp-content/uploads/2022/12/logo_color.png"
            className="w-[300px]"
            alt=""
          />
        </a>
      </div>
      <Sandwich />
    </nav>
  );
}
