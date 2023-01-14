import Sandwich from "./Sandwitch";

export function NavBar(props?: any) {
  return (
    <nav className=" flex items-center w-[100vw] px-5 mt-8 justify-center">
      <div>
        <img
          src="https://www.sharenergy.com.br/wp-content/uploads/2022/12/logo_color.png"
          className="w-[10%] "
          alt=""
        />
      </div>
      <Sandwich />
    </nav>
  );
}
