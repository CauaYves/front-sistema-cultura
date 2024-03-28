export type User = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

export type UserData = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  emailConfirmed: string;
  token: string;
};

export type CulturalUser = {
  address: string;
  borndate: string;
  cep: string;
  codename: string;
  complement: string;
  deficiency: boolean;
  education: string;
  email: string;
  extracurricularCourses: string;
  gender: string;
  houseNumber: string;
  issuingbody: string;
  mothername: string;
  nacionality: string;
  naturalness: string;
  public: boolean;
  race: string;
  rg: string;
  student: boolean;
  superiorCourses: string;
  uf: string;
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

const inputProps: InputProps = {
  fullWidth: true,
  required: true,
  margin: "dense",
};

export { inputProps };
