export type User = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};
export type Session = {
  user: {
    id: number
    name: string
    email: string
    cpf: string
    emailConfirme: boolean
  };
  token: string
};
export type UserData = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  emailConfirmed: string;
  token: string;
};

export type Contact = {
  id: number;
  type: string;
  number: string;
  public: boolean | string;
};

export type Collective = {
  id: number;
  name: string;
  area: string;
  opening: string;
  phone: string;
  email: string;
  address: string;
  neighboorhood: string;
  cep: string;
  complement: string;
  county: string;
  responsible: string;
  userId: number;
};

type InputProps = {
  margin: "dense" | "none" | "normal";
  fullWidth: boolean;
  required: boolean;
};

export type CulturalAgentPf = {
  alternativeTel: string;
  cep: string;
  complement: string;
  county: string;
  cpf: string;
  email: string;
  houseNumber: string;
  name: string;
  neighboorhood: string;
  phone: string;
  programs: string[];
  proponent: string;
  public: boolean;
  publicPlace: string;
  tel: string;
  uf: string;
};

export type CulturalAgentPj = {
  alternativeTel: string;
  cep: string;
  cnpj: string;
  complement: string;
  county: string;
  email: string;
  fantasyName: string;
  houseNumber: string;
  job: string;
  neighboorhood: string;
  phone: string;
  programs: string[];
  proponent: string;
  public: boolean;
  publicPlace: string;
  responsible: string;
  socialReason: string;
  tel: string;
  uf: string;
  website: string;
};
const inputProps: InputProps = {
  fullWidth: true,
  required: true,
  margin: "dense",
};

export { inputProps };
