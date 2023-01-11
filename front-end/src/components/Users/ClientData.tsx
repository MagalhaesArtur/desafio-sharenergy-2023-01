import { ClientsProps } from "../../utils/interfaces";

function ClientData(props: { client: ClientsProps }) {
  return (
    <div className="flex gap-5 mt-4 flex-col">
      <div className="flex gap-4">
        <h3 className="text-slate-800 font-bold text-lg">Nome:</h3>
        <h2 className="text-green-700 font-bold text-lg">
          {props.client.name}
        </h2>
      </div>
      <div className="flex gap-4">
        <h3 className="text-slate-800 font-bold text-lg">Endereço:</h3>
        <h2 className="text-green-800 font-bold text-lg">
          {props.client.address}
        </h2>
      </div>
      <div className="flex gap-4">
        <h3 className="text-slate-800 font-bold text-lg">CPF:</h3>
        <h2 className="text-green-800 font-bold text-lg">{props.client.cpf}</h2>
      </div>
      <div className="flex gap-4">
        <h3 className="text-slate-800 font-bold text-lg">Email:</h3>
        <h2 className="text-green-800 font-bold text-lg">
          {props.client.email}
        </h2>
      </div>
      <div className="flex gap-4">
        <h3 className="text-slate-800 font-bold text-lg">
          Numero de Telefone:
        </h3>
        <h2 className="text-green-800 font-bold text-lg">
          {props.client.number}
        </h2>
      </div>
    </div>
  );
}

export default ClientData;
