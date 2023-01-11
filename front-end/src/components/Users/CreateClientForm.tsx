import { FormEvent, useState } from "react";
import InputMask from "react-input-mask";
import { CreateUser } from "../../utils/api";
import { ClientsProps } from "../../utils/interfaces";
import { validateEmail, validateCPF, validadeNumber } from "../../utils/regex";
import { Loading } from "../Loading";

function CreateClientForm(props: {
  isDialogCreateClientOpen: boolean;
  setIsDialogCreateClientOpen: Function;
  setIsCreatedClient: Function;
  isCreatedClient: boolean;
}) {
  const [cpf, setCpf] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginErrorCPF, setIsLoginErrorCPF] = useState(false);

  const [MessageError, setMessageError] = useState("");

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    let createdClient = await CreateUser({ address, cpf, email, name, number });

    if (typeof createdClient == "string") {
      if (createdClient == "Email já existe!") {
        setIsLoginError(true);
        setMessageError(createdClient);
      } else {
        setIsLoginErrorCPF(true);
        setMessageError(createdClient);
      }
      setTimeout(() => {
        setIsLoginError(false);
        setIsLoginErrorCPF(false);
      }, 4000);
    } else {
      props.setIsCreatedClient(!props.isCreatedClient);
      alert("Cliente criado com sucesso!");
      props.setIsDialogCreateClientOpen(false);
    }

    setLoading(false);
  }

  return (
    <form
      className="flex mt-[50px] items-center flex-col gap-1"
      onSubmit={handleSubmit}
    >
      <label className={`  w-[90%] flex flex-col justify-around`}>
        <div className="flex w-full items-center justify-around">
          <h2 className="text-slate-800 font-semibold text-base">CPF:</h2>
          <InputMask
            mask="999.999.999-99"
            required
            className={` ${
              CPFErr ? "!border-red-500 !border-[1px]" : null
            } input1 !shadow-md focus:border-green-500 w-[70%]`}
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
        {isLoginErrorCPF ? (
          <h1 className=" m-auto mt-2 text-lg text-red-700 font-bold">
            {MessageError}
          </h1>
        ) : null}
      </label>
      <br />
      <label className="w-[90%] items-center flex  flex-col   justify-around">
        <div className="flex w-full items-center justify-around">
          <h2 className="text-slate-800 font-semibold text-base">Email:</h2>
          <input
            required
            className={`input1 ${
              emailErr || isLoginError ? "!border-red-500 !border-[1px]" : null
            } !shadow-md focus:border-green-500 w-[70%]`}
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

        {isLoginError ? (
          <h1 className=" m-auto mt-2 text-lg text-red-700 font-bold">
            {MessageError}
          </h1>
        ) : null}
      </label>
      <br />
      <label className="w-[90%] items-center flex  justify-around">
        <h2 className="text-slate-800 font-semibold text-base">Nome:</h2>
        <input
          required
          className="input1 !shadow-md focus:!border-green-500 w-[70%]"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label className="w-[90%] items-center flex flex-col  justify-around">
        <div className="flex w-full items-center justify-around">
          <h2 className="text-slate-800 font-semibold text-base">Telefone:</h2>
          <InputMask
            mask="(99)99999-9999"
            required
            className={`input1 !shadow-md ${
              numErr ? "!border-red-500 !border-[1px]" : null
            } focus:border-green-500 w-[70%]`}
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
        <h2 className="text-slate-800 font-semibold text-base">Endereço:</h2>
        <input
          required
          className="input1 !shadow-md focus:!border-green-500 w-[70%]"
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
        className="hover:!border-green-600"
        type="submit"
      >
        {loading ? <Loading size={30} /> : "Criar Cliente"}
      </button>
    </form>
  );
}

export default CreateClientForm;
