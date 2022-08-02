import axios from "axios";

export default async function Atualizador(req, res) {
  const response = await axios.get(
    "https://api.github.com/repos/Sisplan-Sistemas/atualizador_sisplan_web/releases/latest"
  );

  res.send(response.data.assets[0].browser_download_url);
}
