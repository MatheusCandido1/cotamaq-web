import { cpf, cnpj } from 'cpf-cnpj-validator';

export const isValidCPF = (value) => {
  return cpf.isValid(value);
};

export const isValidCNPJ = (value) => {
  return cnpj.isValid(value);
};
