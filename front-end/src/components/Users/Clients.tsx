import { Eye, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { GetUsers } from "../../utils/api";
import { ClientsProps } from "../../utils/interfaces";

function Clients() {
  const [clients, setClients] = useState(Array<ClientsProps>);
  const getUsers = async () => {
    const users = await GetUsers();
    setClients(users.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(clients);

  return (
    <div className="flex justify-center items-center bg-no-repeat bg-center h-[100vh] w-[100vw]">
      <div className="w-[80%] h-[400px] overflow-y-scroll">
        {clients.map((client) => (
          <div className="bg-[#d0d3d4] justify-between flex w-[90%] rounded-xl p-4">
            <div>
              <h3 className="text-xl text-[#14163c] font-semibold ">
                {client.name}
              </h3>
            </div>
            <div className="flex gap-3">
              <button
                title="Visualizar todos os dados"
                className="bg-green-700 hover:bg-green-600 transition-all w-8 h-8 flex justify-center items-center rounded-md"
              >
                <Eye color="white" size={26} />
              </button>
              <button
                title="Visualizar todos os dados"
                className="bg-red-700 hover:bg-red-600 transition-all w-8 h-8 flex justify-center items-center rounded-md"
              >
                <X color="white" size={26} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;
