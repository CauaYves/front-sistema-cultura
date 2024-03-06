export type User = {
  name: string;
  cpf: string;
  email: string;
  password: string;
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
  type: string;
  number: string;
  public: boolean | string;
};
