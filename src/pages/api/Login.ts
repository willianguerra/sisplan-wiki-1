import { apiSisplan, apiWeb } from "../../services/apiSisplan";

export default async function Login(req, res) {
  try {
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

    const response = await apiWeb.get(
      "/sisplan/funcoes/v1/loginweb",
      {
        headers: {
          Authorization: `Bearer ${token.data}`,
        },
        params: {
          email: req.query.EMAIL,
          senha: req.query.SENHA,
          empresa: '_001'
        }
      }
    );

    res.status(response.status).send('TRUE');
  } catch (err) {
    console.error(err)
    res.status(400).send('FALSE');
  }

  // const retorno = response.data;

  // res.status(response.status).send(response.data)
}