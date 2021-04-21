export class Cliente {
  id?: number;
  cpf: number;
  primeiroNome: string;
  ultimoNome: string;
  dataNascimento: string;
  sexo: string;
  salario: number;
  profissao: string;
  enderecos?: Address[];
}

export interface Address {
  id: number;
  id_cliente: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}


