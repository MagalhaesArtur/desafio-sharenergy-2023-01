export interface UserProps {
  id: string;
  email: string;
  number: string;
  cpf: string;
  address: string;
  name: string;
}

export interface AdmProps {
  login: string;
  password: string;
  rememberMe: boolean;
  id: string;
}
