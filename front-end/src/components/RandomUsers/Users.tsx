import { Eye, X } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";
import * as Dialog from "@radix-ui/react-dialog";
import { UserData } from "./User";

import "./styles/user.css";

export function Users(props: { randomUsers: any[]; loading: boolean }) {
  const [isDialogClientDataOpen, setIsDialogClientDataOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(Object);

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

            <UserData user={currentUser} />

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {props.loading ? (
        <div className=" flex justify-center items-center w-[60%] h-[600px]">
          <Loading size={60} />
        </div>
      ) : (
        <div
          id="user"
          className="flex  w-full h-[600px] gap-3 items-stretch rounded-lg  flex-col"
        >
          {props.randomUsers.map((user) => (
            <div
              key={user.login.username}
              id="userBox"
              className="flex  bg-[#dcdde1] gap-6 justify-between  rounded-lg p-3 border-gray-700 h-[20%] items-center"
            >
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
                className="bg-[#00a2a2] mr-4 hover:bg-[#2e6464] transition-all w-10 h-10 flex justify-center items-center rounded-md"
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
