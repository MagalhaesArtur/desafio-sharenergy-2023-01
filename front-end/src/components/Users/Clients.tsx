import { Eye, Pen, X } from "phosphor-react";
import { useEffect, useState } from "react";
import { DeleteUser, GetUsers } from "../../utils/api";
import { ClientsProps } from "../../utils/interfaces";
import { Loading } from "../Loading";
import * as Dialog from "@radix-ui/react-dialog";
import ClientData from "./ClientData";
import UpClient from "./UpClient";
import { useNavigate } from "react-router-dom";
import CreateClient from "./CreateClient";

function Clients() {
  let navigate = useNavigate();

  const [clients, setClients] = useState(Array<ClientsProps>);
  const [currentClient, setCurrentClient] = useState(Object);

  const [isCreatedClient, setIsCreatedClient] = useState(false);

  const [isDialogCreateClientOpen, setIsDialogCreateClientOpen] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [isDialogClientDataOpen, setIsDialogClientDataOpen] = useState(false);
  const [isDialogUdateDataOpen, setIsDialogUpdateDataOpen] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const users = await GetUsers();
    if (typeof users == "string") {
      navigate("/login");
      alert(users + " Faça o login novamente!");
    } else {
      setClients(users.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, [isCreatedClient]);

  return (
    <div
      className={`flex justify-around flex-col  items-center bg-no-repeat bg-center h-[100vh] w-[100vw] `}
    >
      <CreateClient
        setIsCreatedClient={setIsCreatedClient}
        isCreatedClient={isCreatedClient}
        isDialogCreateClientOpen={isDialogCreateClientOpen}
        setIsDialogCreateClientOpen={setIsDialogCreateClientOpen}
      />

      <Dialog.Root
        open={isDialogClientDataOpen}
        onOpenChange={setIsDialogClientDataOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed   bg-[#d0d3d4] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-[#14163c] rounded-lg w-[600px] shadow-lg shadow-black/40">
            <X
              className="absolute cursor-pointer right-4 top-4"
              onClick={() => {
                setIsDialogClientDataOpen(false);
              }}
              size={30}
            />
            <Dialog.Title className="text-3xl  font-black">
              Dados do cliente
            </Dialog.Title>

            <ClientData client={currentClient} />

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root
        open={isDialogUdateDataOpen}
        onOpenChange={setIsDialogUpdateDataOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed   bg-[#d0d3d4] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-[#14163c] rounded-lg w-[600px] shadow-lg shadow-black/40">
            <X
              className="absolute cursor-pointer right-4 top-4"
              onClick={() => {
                setIsDialogUpdateDataOpen(false);
              }}
              size={30}
            />
            <Dialog.Title className="text-3xl  font-black">
              Atualizar Dados do Cliente
            </Dialog.Title>
            <UpClient
              clients={clients}
              setIsDialogUpdateDataOpen={setIsDialogUpdateDataOpen}
              setClients={setClients}
              client={currentClient}
            />
            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {loading ? (
        <div className="text-white">
          <Loading size={90} />
        </div>
      ) : (
        <div
          className={`w-[60%] h-[400px] flex flex-col gap-5  ${
            clients.length >= 5 ? "overflow-y-scroll" : "overflow-y-hidden"
          }`}
        >
          <h1 className="text-white font-bold text-2xl">Lista de Clientes:</h1>
          {clients.map((client) => (
            <div className="bg-[#d0d3d4] justify-between flex w-[90%] rounded-xl p-5">
              <div>
                <h3 className="text-xl text-[#14163c] font-semibold ">
                  {client.name}
                </h3>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDialogClientDataOpen(true);
                    setCurrentClient(client);
                  }}
                  title="Visualizar todos os dados"
                  className="bg-green-700 hover:bg-green-600 transition-all w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <Eye color="white" size={26} />
                </button>

                <button
                  onClick={() => {
                    setIsDialogUpdateDataOpen(true);
                    setCurrentClient(client);
                  }}
                  title="Alterar Dados"
                  className="bg-blue-700 hover:bg-blue-600 transition-all w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <Pen size={32} color="white" />
                </button>
                <button
                  title="Deletar Cliente"
                  onClick={async () => {
                    // Deletando o cliente no back-end e fazendo um splice na lista de clientes
                    let index = -1;
                    const deletedUser = await DeleteUser(client.id);
                    const clientsCopy: Array<ClientsProps> = JSON.parse(
                      JSON.stringify(clients)
                    );
                    for (let client in clients) {
                      if (deletedUser.data.id === clients[client].id) {
                        index = Number(client);
                      }
                    }
                    clientsCopy.splice(index, 1);
                    setClients(clientsCopy);
                  }}
                  className="bg-red-700 hover:bg-red-600 transition-all w-8 h-8 flex justify-center items-center rounded-md"
                >
                  <X color="white" size={26} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clients;
