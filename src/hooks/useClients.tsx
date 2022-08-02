import { ClienteProps } from "../@types/ClientsProps";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import axios from "axios";
import { ptBR } from "date-fns/locale";

export function useClients() {
  const [clientes, setClientes] = useState<ClienteProps[]>([]);

  useEffect(() => {
    try {
    } catch (error) {
      console.error(error);
    }
    async function retornaClientes() {
      const response = await axios.get(`/api/apiSisplan`);
      const clientesFormatado = response.data.map((cliente) => {
        const clientes = {
          ...cliente,
          dataVersao: format(new Date(cliente.dataVersao), "Pp", {
            locale: ptBR
          }),
        };
        return clientes;
      });
      setClientes(clientesFormatado);
    }

    retornaClientes();
  }, []);

  return clientes;
}
