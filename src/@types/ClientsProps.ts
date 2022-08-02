export interface ClienteProps {
  CODCLI: string;
  NOME: string;
  CNPJ: string;
  porta_Externo: string;
  dataVersao: string;
  versao: string;
}

export interface ClientesProps {
  clientes : ClienteProps[];
}
