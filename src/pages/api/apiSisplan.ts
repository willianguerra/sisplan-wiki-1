import axios from "axios";
import { apiSisplan } from "../../services/apiSisplan";

export default async function ApiSisplan(req, res) {
  const token = await apiSisplan.post(
    "login",
    {
      email: "apontamento@sisplansistemas.com.br",
      senha: "SungW+9Vi7tncYkqisq79A==",
      cnpj: "01.234.567/8901-23",
    },
    {
      headers: {
        Authorization: "Basic c2lzcGxhbjpzaXNwbGFu",
      },
    }
  );
  const responseClient = await axios.get(
    "http://aplicativo.sisplansistemas.com.br:10441/buscalistaconexoes?TIPO=WEB",
    {
      headers: {
        "Content-Type": "application/",
        Authorization: "Basic c2lzcGxhbjpzaXNwbGFu",
      },
    }
  );

  const listaCNPJ = responseClient.data.resultado.map(
    (cliente) => `'${cliente.cNPJ}'`
  );

  const response = await axios.get(
    `http://aplicativo.sisplansistemas.com.br:10442/retornojson?JSON={"tabela":"entidade","camposSelect":["CODCLI", "CNPJ", "NOME"],"where":["CNPJ IN (${listaCNPJ.toString()})"]}&EMPRESA=_001`,
    {
      headers: {
        Authorization: `Bearer ${token.data}`,
      },
    }
  );

  if (!response) {
    return;
  }

  if (response.status != 200) {
    return;
  }

  const listaNomes = responseClient.data.resultado.map((info) => {
    const empresa = response.data.find((dado) => dado.CNPJ == info.cNPJ);
    return {
      ...info,
      CODCLI: empresa?.CODCLI,
      CNPJ: info.cNPJ,
      NOME: empresa?.NOME,
    };
  });

  const responseCnpjConversao = await axios.get(
    `http://aplicativo.sisplansistemas.com.br:10442/retornojson?JSON={"tabela":"ENTIDADE","camposSelect":["ENTIDADE.CODCLI","ENTIDADE.NOME","CNPJ_CONVERSAO.CNPJ_FILIAL CNPJ"],"innerJoin":[{"tabela":"CNPJ_CONVERSAO","condicao":"CNPJ_CONVERSAO.CNPJ = ENTIDADE.CNPJ"}],"where":["CNPJ_CONVERSAO.CNPJ_FILIAL IN (${listaCNPJ.toString()})"]}&EMPRESA=_001`,
    {
      headers: {
        Authorization: `Bearer ${token.data}`,
      },
    }
  );

  if (!responseCnpjConversao) {
    return;
  }

  if (responseCnpjConversao.status != 200) {
    return;
  }

  const listaNomes2 = listaNomes.map((info) => {
    const empresa = responseCnpjConversao.data.find(
      (dado) => dado.CNPJ == info.cNPJ
    );
    return {
      ...info,
      CODCLI: empresa?.CODCLI || info.CODCLI,
      NOME: empresa?.NOME || info.NOME,
    };
  });
  res.status(200).json(listaNomes2);
}
