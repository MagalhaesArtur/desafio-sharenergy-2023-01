import { Eye, X } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";
import * as Dialog from "@radix-ui/react-dialog";
import { User } from "./User";

export function Users(props: { randomUsers: any[]; loading: boolean }) {
  const [isDialogClientDataOpen, setIsDialogClientDataOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(Object);

  console.log(props.randomUsers);
  return (
    <>
      <Dialog.Root
        open={isDialogClientDataOpen}
        onOpenChange={setIsDialogClientDataOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed   bg-[#d0d3d4] py-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px]  text-[#14163c] rounded-lg w-[700px] shadow-lg shadow-black/40">
            <X
              className="absolute z-10 cursor-pointer right-4 top-4"
              onClick={() => {
                setIsDialogClientDataOpen(false);
              }}
              size={30}
            />

            <User user={currentUser} />

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {props.loading ? (
        <Loading />
      ) : (
        <div className="flex  w-[60%] h-[600px] gap-1 items-stretch rounded-lg  flex-col">
          {props.randomUsers.map((user) => (
            <div className="flex bg-[#dcdde1] gap-6 justify-between  rounded-lg p-3 border-gray-700 h-[20%] items-center">
              <div className="flex gap-6 items-center">
                <img
                  className="rounded-full border-[#353b48] border-[2px]"
                  src={`${user.picture.medium}`}
                  alt=""
                />
                <h1 className="text-xl font-bold">
                  {user.name.first + " " + user.name.last}
                </h1>
              </div>
              <button
                onClick={() => {
                  setIsDialogClientDataOpen(true);
                  setCurrentUser(user);
                }}
                title="Visualizar todos os dados"
                className="bg-green-700 mr-4 hover:bg-green-600 transition-all w-10 h-10 flex justify-center items-center rounded-md"
              >
                <Eye color="white" size={26} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
