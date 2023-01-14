import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useState } from "react";
import { ClientsProps } from "../../utils/interfaces";
import CreateClientForm from "./CreateClientForm";

const CreateClient = (props: {
  isDarkMode: boolean;
  isDialogCreateClientOpen: boolean;
  setIsDialogCreateClientOpen: Function;
  setIsCreatedClient: Function;
  isCreatedClient: boolean;
}) => {
  return (
    <div>
      <Dialog.Root open={props.isDialogCreateClientOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={() => {
              props.setIsDialogCreateClientOpen(
                !props.isDialogCreateClientOpen
              );
            }}
            className="bg-black/60 inset-0 fixed"
          />
          <Dialog.Content
            id="dialogClientData"
            className={`fixed ${
              props.isDarkMode ? "bg-[#14163c]" : "bg-[#d0d3d4]"
            }  py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   rounded-lg w-[600px] shadow-lg shadow-black/40`}
          >
            <X
              className="absolute text-red-500 cursor-pointer right-4 top-4"
              onClick={() => {
                props.setIsDialogCreateClientOpen(false);
              }}
              size={30}
            />
            <Dialog.Title
              className={`text-3xl  ${
                props.isDarkMode ? "text-white" : "text-slate-800"
              } font-black`}
            >
              Criar Cliente
            </Dialog.Title>
            <CreateClientForm
              isDarkMode={props.isDarkMode}
              setIsCreatedClient={props.setIsCreatedClient}
              isCreatedClient={props.isCreatedClient}
              isDialogCreateClientOpen={props.isDialogCreateClientOpen}
              setIsDialogCreateClientOpen={props.setIsDialogCreateClientOpen}
            />

            <Dialog.Description />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <button
        onClick={() => {
          props.setIsDialogCreateClientOpen(true);
        }}
        className="bg-green-700 transition-all hover:bg-green-600 text-white font-bold text-lg rounded-lg p-5"
      >
        Criar Novo Cliente
      </button>
    </div>
  );
};

export default CreateClient;
