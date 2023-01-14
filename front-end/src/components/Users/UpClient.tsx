import { FormEvent, useEffect, useState } from "react";
import { AttUser } from "../../utils/api";
import { ClientsProps } from "../../utils/interfaces";
import { Loading } from "../Loading";
import { validateEmail, validateCPF, validadeNumber } from "../../utils/regex";

import InputMask from "react-input-mask";

const UpClient = (props: {
  client: ClientsProps;
  clients: ClientsProps[];
  setClients: Function;
  isDarkMode: boolean;

  setIsDialogUpdateDataOpen: Function;
}) => {
  const [cpf, setCpf] = useState(props.client.cpf);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [id, setCurrentId] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [CPFErr, setCPFErr] = useState(false);
  const [numErr, setNumErr] = useState(false);

  const validateEmail1 = (email: string) => {
    if (!validateEmail.test(email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  };

  const validateCPF1 = (CPF: string) => {
    if (!validateCPF.test(CPF)) {
      setCPFErr(true);
    } else {
      setCPFErr(false);
    }
  };

  const validateNum1 = (num: string) => {
    if (!validadeNumber.test(num.replace("(", "").replace(")", ""))) {
      setNumErr(true);
    } else {
      setNumErr(false);
    }
  };

  useEffect(() => {
    setAddress(props.client.address);
    setEmail(props.client.email);
    setName(props.client.name);
    setNumber(props.client.number);

    setCpf(props.client.cpf);
    setCurrentId(props.client.id);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const { data } = await AttUser({
      cpf,
      address,
      email,
      id,
      name,
      number,
    });
    const clientsCopy: Array<ClientsProps> = JSON.parse(
      JSON.stringify(props.clients)
    );
    for (let client in clientsCopy) {
      if (data.id === clientsCopy[client].id) {
        clientsCopy[client] = data;
      }
    }

    props.setClients(clientsCopy);

    alert("Dados do usuário atualizados com sucesso!");
    props.setIsDialogUpdateDataOpen(false);
    setLoading(false);
  }

  return (
    <form
      className={` flex mt-[50px] ${
        props.isDarkMode ? "text-white" : "text-slate-800 "
      } items-center flex-col gap-1`}
      onSubmit={handleSubmit}
    >
      <label
        className={`
w-[90%] flex flex-col justify-around`}
      >
        <div className="flex w-full items-center justify-around">
          <h2 className=" font-semibold text-base">CPF:</h2>
          <InputMask
            mask="999.999.999-99"
            required
            className={` ${
              CPFErr ? "!border-red-500 !border-[1px]" : null
            } input1 !shadow-md focus:border-[#00a2a2] w-[70%]`}
            type="text"
            value={cpf}
            onChange={(e) => {
              setCpf(e.target.value);
              validateCPF1(e.target.value);
            }}
          />
        </div>
        {CPFErr ? (
          <h1 className="text-lg m-auto mt-2 text-red-700 font-bold">
            CPF inválido{" "}
          </h1>
        ) : null}
      </label>
      <br />
      <label className="w-[90%] items-center flex  flex-col   justify-around">
        <div className="flex w-full items-center justify-around">
          <h2 className=" font-semibold text-base">Email:</h2>
          <input
            required
            className={`input1 ${
              emailErr ? "!border-red-500 !border-[1px]" : null
            } !shadow-md focus:border-[#00a2a2] w-[70%]`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail1(e.target.value);
            }}
          />
        </div>
        {emailErr ? (
          <h1 className="text-lg m-auto mt-2 text-red-700 font-bold">
            Email inválido{" "}
          </h1>
        ) : null}
      </label>
      <br />
      <label className="w-[90%] items-center flex  justify-around">
        <h2 className=" font-semibold text-base">Nome:</h2>
        <input
          required
          className="input1 !shadow-md focus:!border-[#00a2a2] w-[70%]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label className="w-[90%] items-center flex flex-col  justify-around">
        <div className="flex w-full items-center justify-around">
          <h2 className=" font-semibold text-base">Telefone:</h2>
          <InputMask
            mask="(99)99999-9999"
            required
            className={`input1 !shadow-md ${
              numErr ? "!border-red-500 !border-[1px]" : null
            } focus:border-[#00a2a2] w-[70%]`}
            type="tel"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              validateNum1(e.target.value);
            }}
          />
        </div>
        {numErr ? (
          <h1 className="text-lg m-auto mt-2 text-red-700 font-bold">
            Telefone inválido{" "}
          </h1>
        ) : null}
      </label>
      <br />
      <label className="w-[90%] items-center flex  justify-around">
        <h2 className=" font-semibold text-base">Endereço:</h2>
        <input
          required
          className="input1 !shadow-md focus:!border-[#00a2a2] w-[70%]"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <br />
      <button
        disabled={emailErr || CPFErr || numErr}
        onClick={() => {
          setLoading(true);
        }}
        id="submitButton"
        className="hover:!border-[#00a2a2]"
        type="submit"
      >
        {loading ? <Loading size={30} /> : "Atualizar Dados"}
      </button>
    </form>
  );
};

export default UpClient;
